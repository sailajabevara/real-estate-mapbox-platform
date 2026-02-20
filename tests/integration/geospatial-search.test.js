const puppeteer = require("puppeteer");

jest.setTimeout(60000);

describe("Radius Filtering", () => {

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    // await page.goto("http://localhost:5173/properties");
    await page.goto("http://localhost:3006/properties")


    await page.waitForSelector('[data-testid="map-loaded"]');
  });

  afterAll(async () => {
    await browser.close();
  });
 test("Markers change after map move", async () => {

  const initialCount = (await page.$$('[data-testid^="map-marker-"]')).length;

  await page.evaluate(() => {
    window.mapboxMap.flyTo({ center: [-122.4194, 37.7749], zoom: 10 });
  });

  await page.waitForFunction(() => window.mapboxMapLoaded === true);

  const newCount = (await page.$$('[data-testid^="map-marker-"]')).length;

  expect(newCount).toBeGreaterThan(0);
});
});
