// utils/scrape.js
import puppeteer from "puppeteer";

export const scrape = async (downloadUrl) => {
  let browser;

  try {
    browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(downloadUrl, { waitUntil: "networkidle0", timeout: 15000 });

    const fileValues = await page.evaluate(() => {
      const nameData = ["id", "export", "authuser", "confirm", "uuid", "at"];
      const allValues = {};

      nameData.forEach((name) => {
        const input = document.querySelector(`input[name="${name}"]`);
        if (input) allValues[name] = input.value;
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
