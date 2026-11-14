// utils/scrape.js
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { performance } from "node:perf_hooks";

puppeteer.use(StealthPlugin());

const BROWSER_IDLE_TIMEOUT_MS = 60_000;
let sharedBrowser;
let browserLaunchPromise;
let browserIdleTimer;

const measure = async (timings, stage, operation) => {
	const startedAt = performance.now();
	try {
		return await operation();
	} finally {
		timings[stage] = Math.round(performance.now() - startedAt);
	}
};

const launchBrowser = () =>
	puppeteer.launch({
		headless: "new",
		protocolTimeout: 60000,
		args: [
			"--no-sandbox",
			"--disable-setuid-sandbox",
			"--disable-dev-shm-usage",
			"--disable-gpu",
			"--disable-software-rasterizer",
			"--disable-webgl",
			"--disable-extensions",
			"--disable-background-networking",
			"--disable-sync",
			"--metrics-recording-only",
			"--mute-audio",
			"--no-first-run",
			"--safebrowsing-disable-auto-update",
		],
		ignoreHTTPSErrors: true,
	});

const getBrowser = async (timings) => {
	clearTimeout(browserIdleTimer);
	browserIdleTimer = undefined;

	if (sharedBrowser?.isConnected()) {
		timings.browserReused = true;
		timings.browserLaunch = 0;
		return sharedBrowser;
	}

	timings.browserReused = false;
	if (!browserLaunchPromise) {
		browserLaunchPromise = launchBrowser()
			.then((browser) => {
				sharedBrowser = browser;
				browser.once("disconnected", () => {
					if (sharedBrowser === browser) sharedBrowser = undefined;
				});
				return browser;
			})
			.finally(() => {
				browserLaunchPromise = undefined;
			});
	}

	return measure(timings, "browserLaunch", () => browserLaunchPromise);
};

const scheduleBrowserClose = (browser) => {
	if (!browser) return;

	clearTimeout(browserIdleTimer);
	browserIdleTimer = setTimeout(() => {
		browserIdleTimer = undefined;
		if (sharedBrowser !== browser) return;

		sharedBrowser = undefined;
		browser.close().catch((error) => {
			console.error("Error closing idle browser:", error.message);
		});
	}, BROWSER_IDLE_TIMEOUT_MS);
	browserIdleTimer.unref();
};

process.once("exit", () => {
	sharedBrowser?.process()?.kill();
});

export const scrape = async (downloadUrl) => {
	let browser;
	let context;
	const timings = {};

	try {
		browser = await getBrowser(timings);
		context = await measure(timings, "newContext", () =>
			browser.createBrowserContext(),
		);
		const page = await measure(timings, "newPage", () => context.newPage());
		await page.setDefaultNavigationTimeout(30000); // optional but safer

		await page.setUserAgent(
			"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
		);

		await measure(timings, "navigation", () =>
			page.goto(downloadUrl, {
				waitUntil: "domcontentloaded",
				timeout: 15000,
			}),
		);
		await measure(timings, "fieldWait", () =>
			page.waitForFunction(
				() => {
					const confirm = document.querySelector('input[name="confirm"]');
					const uuid = document.querySelector('input[name="uuid"]');
					return Boolean(confirm?.value && uuid?.value);
				},
				{ timeout: 10000 },
			),
		);

		const fileValues = await measure(timings, "fieldExtraction", () =>
			page.evaluate(() => {
				const nameData = ["id", "export", "authuser", "confirm", "uuid", "at"];
				const allValues = {};

				nameData.forEach((name) => {
					const input = document.querySelector(`input[name="${name}"]`);
					allValues[name] = input ? input.value : null;
				});

				return allValues;
			}),
		);

		if (Object.keys(fileValues).length === 0) {
			throw new Error("No input fields found on the page");
		}

		return fileValues;
	} catch (error) {
		console.error("Error in scrape:", error.message);
		throw error;
	} finally {
		try {
			if (context) {
				await measure(timings, "contextClose", () => context.close());
			}
		} finally {
			scheduleBrowserClose(browser);
			console.info(`[scrape] timings_ms=${JSON.stringify(timings)}`);
		}
	}
};
