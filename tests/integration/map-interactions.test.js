

const puppeteer = require("puppeteer");

jest.setTimeout(60000);

describe("Marker Interaction", () => {

  let browser;
  let page;

  beforeAll(async () => {

    browser = await puppeteer.launch({
      headless: false,
      slowMo: 50
    });

    page = await browser.newPage();

    await page.goto("http://localhost:5173/properties", {
      waitUntil: "networkidle2"
    });

    await page.waitForSelector('[data-testid="map-loaded"]');
    await page.waitForSelector('[data-testid="property-card-1"]');

  });

  afterAll(async () => {
    await browser.close();
  });

  test("clicking marker highlights property card", async () => {

    await page.waitForSelector('[data-testid="map-marker-1"]');

    // 🔥 IMPORTANT: trigger click manually
    await page.evaluate(() => {
      const marker = document.querySelector(
        '[data-testid="map-marker-1"]'
      );
      marker.click();
    });

    // wait until highlight class appears
    await page.waitForFunction(() => {
      const card = document.querySelector(
        '[data-testid="property-card-1"]'
      );
      return card.classList.contains("highlight-card");
    });

    const hasClass = await page.$eval(
      '[data-testid="property-card-1"]',
      el => el.classList.contains("highlight-card")
    );

    expect(hasClass).toBe(true);

  });

});
