// utils/scrape.js
import puppeteer from "puppeteer";

export const scrape = async (downloadUrl) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Go to the download URL and wait for the page to load
    await page.goto(downloadUrl, { waitUntil: "networkidle0" });

    // Extract data from the page
    const fileValues = await page.evaluate(() => {
      const nameData = ["id", "export", "authuser", "confirm", "uuid", "at"];
      const allValues = {};

      nameData.forEach((name) => {
        const inputData = document.querySelector(`input[name="${name}"]`);
        if (inputData) {
          allValues[name] = inputData.value;
        }
      });

      return allValues;
    });

    await browser.close();

    // Return scraped data
    return fileValues;
  } catch (error) {
    console.error("Error in scrape:", error.message);
    throw error;
  }
};
