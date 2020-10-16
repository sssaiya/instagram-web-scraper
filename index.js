const puppeteer = require("puppeteer");
var creds = require("./constants");
const profileUrlToScrape = "https://www.instagram.com/fuuuckingyoung/?hl=en";
const loginURL = "https://www.instagram.com/accounts/login/";

(async () => {
  console.log("Launching pupeteer");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await logIn(page); // Log in with cred
  await page.screenshot({ path: "img/afterLOGIN.png" });
  // Navigate to profile you want to scrape
  await goTo(profileUrlToScrape, page); 
  await page.screenshot({ path: "img/afterNAV.png" });
  await browser.close();
})();

async function logIn(page) {
  console.log(`Logging in as ${creds.USERNAME}`);
  await goTo(loginURL, page);
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', creds.USERNAME);
  await page.type('input[name="password"]', creds.PASSWORD);
  // Submit log in credentials and wait for navigation
  await Promise.all([
    page.click('[type="submit"]'),
    page.waitForNavigation({
      waitUntil: "networkidle0",
    }),
  ]);
  console.log("Logged in");
  //Click Not Now to not remember credentials
  await Promise.all([
    page.evaluate(() => {
      document.querySelectorAll("button")[1].click();
    }),
    page.waitForNavigation({
      waitUntil: "networkidle0",
    }),
  ]);
}

async function goTo(url, page) {
  await Promise.all([
    page.goto(url),
    page.waitForNavigation({
      waitUntil: "networkidle0",
    }),
  ]);
}
