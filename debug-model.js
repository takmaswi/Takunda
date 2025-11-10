const { chromium } = require('playwright');

async function debugModel() {
  console.log('🔍 Debugging 3D model visibility...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  // Capture all console messages
  page.on('console', msg => {
    console.log(`[Console ${msg.type()}]:`, msg.text());
  });

  try {
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    await page.waitForTimeout(5000);

    // Debug THREE.js scene
    const sceneInfo = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return { error: 'No canvas found' };

      // Try to access the THREE renderer
      const renderer = (window as any).__THREE__;

      return {
        canvasSize: { width: canvas.width, height: canvas.height },
        canvasStyle: {
          width: canvas.style.width,
          height: canvas.style.height,
          display: canvas.style.display,
          visibility: canvas.style.visibility,
          opacity: canvas.style.opacity,
        },
        pixelData: (() => {
          const ctx = canvas.getContext('2d');
          if (!ctx) return 'No 2D context';
          try {
            const imageData = ctx.getImageData(960, 540, 1, 1); // Center pixel
            return Array.from(imageData.data);
          } catch (e) {
            return 'WebGL canvas - cannot read pixels directly';
          }
        })(),
      };
    });

    console.log('\n📊 Scene Debug Info:');
    console.log(JSON.stringify(sceneInfo, null, 2));

    // Take a screenshot with annotations
    await page.screenshot({
      path: 'screenshots/debug-view.png',
      fullPage: false
    });

    console.log('\n✅ Debug screenshot saved to screenshots/debug-view.png');
    console.log('\n⏳ Keeping browser open for 30 seconds for manual inspection...');

    await page.waitForTimeout(30000);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await browser.close();
  }
}

debugModel();
