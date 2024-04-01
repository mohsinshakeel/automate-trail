const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const imagePath = path.join(__dirname, 'public/images/sample-pass-image-2.jpeg');
  
  const browser = await chromium.launch({ headless: false }); 
  const page = await browser.newPage();
  
  await page.goto('https://esta.cbp.dhs.gov/');
  await page.click('text=Create New Application');
  await page.click('//*[@id="content"]/div/div/div[1]/ul/li[1]');
  await page.click(`//*[@id="confirmBtn"]`)
  
  // Upload passport image
  await page.click('xpath=//*[@id="border"]/div/div[1]/label');
  await page.click('//*[@id="2collpaseTwoText"]/div[1]/label');
  await page.click('text=NEXT');
  await page.click(`//*[@id="uploadPassportModal"]/div/div/div[3]/button`);
  await page.setInputFiles('input[type="file"]', imagePath);
  await page.click('//*[@id="ocrSuccessModal"]/div/div/div[3]/button[1]');
  
  // Fill in passport details
  await page.waitForSelector('#day_issueDate');
  await page.waitForSelector('#month_issueDate');
  await page.waitForSelector('#year_issueDate');
  await page.selectOption('#day_issueDate', { label: '5' });
  await page.selectOption('#month_issueDate', { label: 'September' });
  await page.selectOption('#year_issueDate', { label: '2015' });
  await page.fill("#birthCity","CROYDON")
  await page.waitForSelector('#birthCountry');
  await page.selectOption('#birthCountry', 'US');
  
  // Citizenship
  await page.click('//*[@id="applicantForm"]/form/app-other-citizenship-section/div[1]/div[2]/div[2]/label');
  await page.click('//*[@id="applicantForm"]/form/app-other-citizenship-section/div[2]/div[2]/div[2]/label');
  
  // Contact details
  await page.fill("#contactEmail","test@gmail.com")
  await page.fill("#contactEmailConfirm","test@gmail.com")
  
  // Navigate to next steps
  await page.click('text=NEXT');
  await page.click('text=CONFIRM & CONTINUE');
  await page.click('text=CONFIRM & CONTINUE');
  await page.click('text=CONFIRM & CONTINUE');
  await page.click('text=CONFIRM & CONTINUE');
  await page.click('//*[@id="sendCode"]/div/div[2]/button[2]');
  
  // Capture screenshot
  await page.waitForSelector('//*[@id="enterCode"]/div/div/form/div[3]/button[3]');
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `Output.png` });
  
  // Close browser
  await browser.close();
})();