const puppeteer = require("puppeteer");

jest.setTimeout(60000);

describe("Map Test", () => {

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50
    });

    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Map loads successfully", async () => {

    await page.goto("http://localhost:5173/properties", {
      waitUntil: "networkidle2"
    });

    await page.waitForSelector('[data-testid="map-loaded"]');

  });

});
