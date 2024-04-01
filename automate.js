const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({
    headless: false,
    proxy: process.env.PROXY_URL // Use proxy if available from environment variable
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Go to the ESTA website
  await page.goto('https://esta.cbp.dhs.gov/');

  // Click on Create New Application => Individual Application
  await Promise.all([
    page.waitForNavigation(),
    page.click('text="Create New Application"'),
    page.click('text="Individual Application"')
  ]);

  // Confirm & Continue
  await Promise.all([
    page.waitForNavigation(),
    page.click('text="Confirm & Continue"')
  ]);

  // On Disclaimer Page, Click Yes
  await Promise.all([
    page.waitForNavigation(),
    page.click('text="Yes"')
  ]);

  // On Travel Promotion Act of 2009, Click Yes
  await Promise.all([
    page.waitForNavigation(),
    page.click('text="Yes"')
  ]);

  // Upload passport photo
  const passportPhotoPath = 'passport_photo.jpg'; // Replace with your file path
  const passportPhoto = fs.readFileSync(passportPhotoPath, 'base64');
  await page.setInputFiles('input[name="passPhoto"]', { name: 'passport_photo.jpg', buffer: Buffer.from(passportPhoto, 'base64') });

  // Fill out all the details based on the passport photo information
  // Replace the following lines with your logic to fill out the form fields

  // Click Next
  await Promise.all([
    page.waitForNavigation(),
    page.click('text="Next"')
  ]);

  // Take a screenshot at confirm email page
  await page.screenshot({ path: 'confirm_email_page.png' });

  // Close the browser
  await browser.close();
})();