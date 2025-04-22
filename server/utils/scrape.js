// utils/scrape.js
import puppeteer from "puppeteer";

let browser;

async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
        "--no-zygote",
      ],
    });
  }
  return browser;
}

export const scrape = async (downloadUrl) => {
  let page;

  try {
    browser = await getBrowser();
    page = await browser.newPage();

    await page.goto(downloadUrl, {
      waitUntil: "networkidle0",
      timeout: 15000,
    });

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
    if (page) await page.close(); // Don't close browser here to allow reuse

    process.on("exit", async () => {
      if (browser) await browser.close(); // on full shutdown
    });
  }
};
