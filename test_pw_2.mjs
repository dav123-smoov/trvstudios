import { chromium } from 'playwright';
import { setTimeout } from 'timers/promises';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => {
    console.log('PAGE ERROR:', error.message);
  });

  await page.goto('http://localhost:4173');
  await setTimeout(2000);
  
  const modalText = await page.evaluate(() => document.body.innerText);
  console.log('Page Text contains Start Your Project:', modalText.includes('Start Your Project') || modalText.includes('Start your project'));
  
  await browser.close();
})();
