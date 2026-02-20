const puppeteer = require("puppeteer");

jest.setTimeout(60000);

describe("Location Autocomplete", () => {

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    // await page.goto("http://localhost:5173/properties", {
    await page.goto("http://localhost:3006/properties", {
      waitUntil: "networkidle2"
    });

    await page.waitForSelector('[data-testid="map-loaded"]');
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Typing location recenters map", async () => {

  await page.type('input[placeholder="Search location..."]', 'San Francisco');

  await page.waitForFunction(() => window.mapboxMapLoaded === true);

  await page.waitForFunction(() => {
    const center = window.mapboxMap.getCenter();
    return center && center.lng !== 0;
  });

  const center = await page.evaluate(() => {
    return window.mapboxMap.getCenter();
  });

  expect(center).toBeDefined();
});
});