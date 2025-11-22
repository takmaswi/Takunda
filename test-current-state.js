const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for 3D scene to load
    console.log('Waiting for 3D scene to load...');
    await page.waitForTimeout(5000);

    // Take screenshot at initial position
    console.log('Taking screenshot at initial position...');
    await page.screenshot({
      path: path.join(__dirname, 'screenshots', 'current-initial.png'),
      fullPage: false
    });

    // Scroll a bit to see rotation
    console.log('Scrolling to see hut rotation...');
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', 'current-scrolled.png'),
      fullPage: false
    });

    // Scroll to middle to see more rotation
    console.log('Scrolling to middle position...');
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(2000);

    await page.screenshot({
      path: path.join(__dirname, 'screenshots', 'current-middle.png'),
      fullPage: false
    });

    console.log('Screenshots saved! Check screenshots/ folder');
    console.log('Keeping browser open for 10 seconds for manual inspection...');
    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
