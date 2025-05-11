// utils/scrape.js
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export const scrape = async (downloadUrl) => {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-software-rasterizer",
        "--disable-webgl",
        "--single-process",
      ],
      ignoreHTTPSErrors: true,
    });
    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36"
    );

    await page.goto(downloadUrl, { waitUntil: "networkidle0", timeout: 15000 });

    const fileValues = await page.evaluate(() => {
      const nameData = ["id", "export", "authuser", "confirm", "uuid", "at"];
      const allValues = {};

      nameData.forEach((name) => {
        const input = document.querySelector(`input[name="${name}"]`);
        allValues[name] = input ? input.value : null;
      });

      return allValues;
    });

    if (Object.keys(fileValues).length === 0) {
      throw new Error("No input fields found on the page");
    }

    return fileValues;
  } catch (error) {
    console.error("Error in scrape:", error.message);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
};
