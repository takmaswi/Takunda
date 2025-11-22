const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000');

  // Wait for entrance screen to appear
  console.log('Waiting for entrance screen...');
  await page.waitForSelector('div[class*="fixed inset-0 z-50"]', { timeout: 5000 });

  // Monitor opacity changes during fade out
  console.log('Monitoring entrance screen opacity every 50ms...');

  const monitor = setInterval(async () => {
    try {
      const entranceScreen = await page.$('div[class*="fixed inset-0 z-50"]');
      if (entranceScreen) {
        const opacity = await entranceScreen.evaluate(el => {
          const style = window.getComputedStyle(el);
          return style.opacity;
        });
        const timestamp = Date.now();
        console.log(`[${timestamp}] Opacity: ${opacity}`);
      } else {
        console.log('Entrance screen removed from DOM');
        clearInterval(monitor);
      }
    } catch (e) {
      console.log('Error checking opacity:', e.message);
      clearInterval(monitor);
    }
  }, 50);

  // Wait for full sequence
  console.log('Waiting for entrance sequence to complete...');
  await page.waitForTimeout(5000);

  clearInterval(monitor);

  // Check final state
  const entranceScreenExists = await page.$('div[class*="fixed inset-0 z-50"]');
  console.log('Entrance screen still visible:', !!entranceScreenExists);

  // Take screenshot
  await page.screenshot({ path: 'screenshots/after-entrance.png', fullPage: true });
  console.log('Screenshot saved to screenshots/after-entrance.png');

  await browser.close();
  console.log('Test complete!');
})();
