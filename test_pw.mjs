import { chromium } from 'playwright';
import { setTimeout } from 'timers/promises';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:4173');
  
  console.log('Clicking button...');
  try {
    await page.click('#hero-cta-btn', { timeout: 2000 });
  } catch (e) {
    console.log('Could not click button:', e.message);
  }
  
  await setTimeout(1000);
  
  const modalText = await page.evaluate(() => document.body.innerText);
  console.log('Page Text contains Start Your Project:', modalText.includes('Start Your Project') || modalText.includes('Start your project'));
  
  console.log('Checking if modal element exists directly:');
  const modalVisible = await page.evaluate(() => {
    const el = document.querySelector('.fixed.inset-0.z-50');
    return el ? getComputedStyle(el).display : 'Not found';
  });
  console.log('Modal display:', modalVisible);
  
  await browser.close();
})();
