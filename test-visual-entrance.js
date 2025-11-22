const { chromium } = require('playwright');

(async () => {
  console.log('🎬 Visual test: New minimal entrance screen\n');

  const browser = await chromium.launch({
    headless: false,
    slowMo: 500 // Slow down for visibility
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:3000');

  console.log('✓ Page loaded');
  console.log('⏳ Watching entrance sequence...\n');

  // Wait for entrance to complete
  await page.waitForTimeout(5000);

  console.log('✓ Entrance sequence complete');
  console.log('✓ Main 3D experience should now be visible\n');

  // Keep browser open for user to see
  console.log('Browser will stay open for 5 seconds...');
  await page.waitForTimeout(5000);

  await browser.close();
  console.log('\n✅ Test complete!');
})();
