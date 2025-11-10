const { chromium } = require('playwright');

async function testSite() {
  console.log('🚀 Starting site test...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Capture console messages
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    if (type === 'error') {
      console.log(`❌ Console Error: ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️  Console Warning: ${text}`);
    } else {
      console.log(`ℹ️  Console: ${text}`);
    }
  });

  // Capture page errors
  page.on('pageerror', error => {
    console.log(`❌ Page Error: ${error.message}`);
  });

  try {
    console.log('📍 Navigating to http://localhost:3001...\n');
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });

    // Wait a bit for 3D scene to load
    console.log('⏳ Waiting for 3D scene to load...\n');
    await page.waitForTimeout(5000);

    // Take screenshot of hero section
    console.log('📸 Capturing hero section...');
    await page.screenshot({ path: 'screenshots/1-hero.png', fullPage: false });

    // Scroll to Foundation section
    console.log('📸 Capturing foundation section...');
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/2-foundation.png', fullPage: false });

    // Scroll to Portfolio section
    console.log('📸 Capturing portfolio section...');
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/3-portfolio.png', fullPage: false });

    // Scroll to Services section
    console.log('📸 Capturing services section...');
    await page.evaluate(() => window.scrollTo(0, 2400));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/4-services.png', fullPage: false });

    // Scroll to Contact section
    console.log('📸 Capturing contact section...');
    await page.evaluate(() => window.scrollTo(0, 3200));
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'screenshots/5-contact.png', fullPage: false });

    // Check if canvas is present
    const canvasExists = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      return {
        exists: !!canvas,
        width: canvas?.width,
        height: canvas?.height,
        visible: canvas ? window.getComputedStyle(canvas).display !== 'none' : false
      };
    });

    console.log('\n🎨 Canvas Info:', canvasExists);

    // Check for 3D scene
    const threeInfo = await page.evaluate(() => {
      return {
        threeLoaded: typeof window.THREE !== 'undefined',
        canvasCount: document.querySelectorAll('canvas').length,
        divs: document.querySelectorAll('div').length
      };
    });

    console.log('🎮 Three.js Info:', threeInfo);

    // Get any error messages displayed on page
    const errorMessage = await page.evaluate(() => {
      const errorDiv = document.querySelector('h2');
      return errorDiv?.textContent || 'No error message found';
    });

    console.log('💬 Page heading:', errorMessage);

    console.log('\n✅ Screenshots saved to screenshots/ folder');
    console.log('🔍 Keep browser open for 10 seconds for inspection...');

    await page.waitForTimeout(10000);

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
    console.log('\n✅ Test complete!');
  }
}

testSite();
