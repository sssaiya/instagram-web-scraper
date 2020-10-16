const puppeteer = require("puppeteer");
var creds = require("./constants");
const profileUrlToScrape = "https://www.instagram.com/fuuuckingyoung/?hl=en";

(async () => {
  console.log("Launching pupeteer");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await logIn(page);
  await page.goto(profileUrlToScrape);
  await page.screenshot({ path: "img/example.png" });
  await browser.close();
})();



async function logIn(page) {
    console.log(`Logging in as ${creds.USERNAME}`);
    await page.goto("https://www.instagram.com/accounts/login/");
    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', creds.USERNAME);
    await page.type('input[name="password"]', creds.PASSWORD);
    await page.screenshot({ path: "img/login.png" });
    await page.click('button[type="submit"]');
    await page.screenshot({ path: "img/submitted.png" });
}