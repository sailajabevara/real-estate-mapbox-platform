const puppeteer = require("puppeteer");

jest.setTimeout(60000);

describe("Property List Rendering", () => {

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    // await page.goto("http://localhost:5173/properties");
    await page.goto("http://localhost:3006/properties")
  });

  afterAll(async () => {
    await browser.close();
  });

  test("Property cards render", async () => {

    await page.waitForSelector('[data-testid="property-card-1"]');

    const cards = await page.$$('[data-testid^="property-card-"]');

    expect(cards.length).toBeGreaterThan(0);
  });

});
