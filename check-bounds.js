const { chromium } = require('playwright');

async function checkBounds() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  page.on('console', msg => {
    const text = msg.text();
    if (text.includes('bounding box') || text.includes('Mesh')) {
      console.log('📦', text);
    }
  });

  await page.goto('http://localhost:3001');
  await page.waitForTimeout(8000);

  await browser.close();
}

checkBounds();
