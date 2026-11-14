// utils/scrape.js
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { performance } from "node:perf_hooks";

puppeteer.use(StealthPlugin());

const measure = async (timings, stage, operation) => {
	const startedAt = performance.now();
	try {
		return await operation();
	} finally {
		timings[stage] = Math.round(performance.now() - startedAt);
	}
};

export const scrape = async (downloadUrl) => {
	let browser;
	const timings = {};

	try {
		browser = await measure(timings, "browserLaunch", () =>
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
			}),
		);
		const page = await measure(timings, "newPage", () => browser.newPage());
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
			if (browser) {
				await measure(timings, "browserClose", () => browser.close());
			}
		} finally {
			console.info(`[scrape] timings_ms=${JSON.stringify(timings)}`);
		}
	}
};
