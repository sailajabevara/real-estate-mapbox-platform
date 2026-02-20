const puppeteer = require("puppeteer");

jest.setTimeout(60000);

describe("Saved Searches Page", () => {

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    // await page.goto("http://localhost:5173/saved-searches");
    await page.goto("http://localhost:3006/saved-searches")

  });

  afterAll(async () => {
    await browser.close();
  });

  test("Saved searches page loads", async () => {

    const body = await page.$("body");

    expect(body).toBeTruthy();
  });

});
