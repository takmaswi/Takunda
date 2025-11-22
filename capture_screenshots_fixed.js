const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function captureScreenshots() {
    console.log('🚀 Starting screenshot capture with delays...');
    const browser = await chromium.launch({ headless: false });
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir);
    }

    // --- Desktop Capture ---
    console.log('\n🖥️  Starting Desktop Capture (1920x1080)...');
    const contextDesktop = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const pageDesktop = await contextDesktop.newPage();

    try {
        await pageDesktop.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
        console.log('   Page loaded. Waiting 5s for initial animations...');
        await pageDesktop.waitForTimeout(5000);

        // Hero
        console.log('   📸 Capturing Desktop Hero...');
        await pageDesktop.screenshot({ path: path.join(screenshotsDir, 'desktop_hero_fixed.png') });

        // Sections (Horizontal scroll)
        // Index 0 is Hero. We start scrolling to index 1 (Foundation).
        const sections = [
            { name: 'foundation', index: 1 },
            { name: 'portfolio_1', index: 2 },
            { name: 'portfolio_2', index: 3 },
            { name: 'portfolio_3', index: 4 },
            { name: 'services', index: 5 },
            { name: 'contact', index: 6 }
        ];

        for (const section of sections) {
            console.log(`   ➡️  Scrolling to ${section.name}...`);
            await pageDesktop.evaluate((idx) => {
                const container = document.querySelector('#scroll-container');
                if (container) {
                    const sectionWidth = container.clientWidth;
                    container.scrollTo({ left: idx * sectionWidth, behavior: 'smooth' });
                }
            }, section.index);

            console.log('      Waiting 3s for animation...');
            await pageDesktop.waitForTimeout(3000);

            console.log(`      📸 Capturing Desktop ${section.name}...`);
            await pageDesktop.screenshot({ path: path.join(screenshotsDir, `desktop_${section.name}_fixed.png`) });
        }
    } catch (e) {
        console.error('❌ Desktop capture failed:', e);
    } finally {
        await contextDesktop.close();
    }

    // --- Mobile Capture ---
    console.log('\n📱 Starting Mobile Capture (375x812)...');
    const contextMobile = await browser.newContext({
        viewport: { width: 375, height: 812 },
        isMobile: true,
        hasTouch: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
    });
    const pageMobile = await contextMobile.newPage();

    try {
        await pageMobile.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
        console.log('   Page loaded. Waiting 5s for initial animations...');
        await pageMobile.waitForTimeout(5000);

        // Hero
        console.log('   📸 Capturing Mobile Hero...');
        await pageMobile.screenshot({ path: path.join(screenshotsDir, 'mobile_hero_fixed.png') });

        const sections = [
            { name: 'foundation', index: 1 },
            { name: 'portfolio_1', index: 2 },
            { name: 'portfolio_2', index: 3 },
            { name: 'portfolio_3', index: 4 },
            { name: 'services', index: 5 },
            { name: 'contact', index: 6 }
        ];

        for (const section of sections) {
            console.log(`   ⬇️  Scrolling to ${section.name}...`);
            await pageMobile.evaluate((idx) => {
                const container = document.querySelector('#scroll-container');
                if (container && container.children[idx]) {
                    container.children[idx].scrollIntoView({ behavior: 'smooth' });
                }
            }, section.index);

            console.log('      Waiting 3s for animation...');
            await pageMobile.waitForTimeout(3000);

            console.log(`      📸 Capturing Mobile ${section.name}...`);
            await pageMobile.screenshot({ path: path.join(screenshotsDir, `mobile_${section.name}_fixed.png`) });
        }
    } catch (e) {
        console.error('❌ Mobile capture failed:', e);
    } finally {
        await browser.close();
    }

    console.log('\n✅ All captures completed.');
}

captureScreenshots();
