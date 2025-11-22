const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  console.log('Testing entrance screen fade sequence...\n');
  await page.goto('http://localhost:3000');

  await page.waitForSelector('div[class*="fixed inset-0 z-50"]', { timeout: 5000 });

  const fadeSequence = [];
  const startTime = Date.now();

  const monitor = setInterval(async () => {
    try {
      const entranceScreen = await page.$('div[class*="fixed inset-0 z-50"]');
      if (entranceScreen) {
        const opacity = await entranceScreen.evaluate(el => {
          const style = window.getComputedStyle(el);
          return parseFloat(style.opacity);
        });
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
        fadeSequence.push({ time: elapsed, opacity: opacity.toFixed(3) });
      } else {
        clearInterval(monitor);
        console.log('\n=== FADE SEQUENCE COMPLETE ===\n');
        console.log('Time (s) | Opacity');
        console.log('---------|---------');

        // Show key milestones
        const milestones = fadeSequence.filter((_, i) => i % 10 === 0 || i === fadeSequence.length - 1);
        milestones.forEach(({ time, opacity }) => {
          console.log(`${time.padStart(8)} | ${opacity}`);
        });

        const duration = fadeSequence.length > 0
          ? (parseFloat(fadeSequence[fadeSequence.length - 1].time) - parseFloat(fadeSequence[0].time)).toFixed(2)
          : '0';

        console.log(`\nFade duration: ${duration}s`);
        console.log('Fade type: ' + (parseFloat(duration) > 0.5 ? 'GRACEFUL ✓' : 'ABRUPT ✗'));
      }
    } catch (e) {
      clearInterval(monitor);
    }
  }, 100);

  await page.waitForTimeout(6000);
  clearInterval(monitor);

  await page.screenshot({ path: 'screenshots/final-state.png', fullPage: true });
  console.log('\nScreenshot saved!');

  await browser.close();
})();
