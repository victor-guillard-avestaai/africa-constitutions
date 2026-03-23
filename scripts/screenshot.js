#!/usr/bin/env node
/**
 * Screenshot + evaluation tool for dashboard.
 * Takes screenshots of all tabs, saves to tmp/screenshots/
 * Usage: node scripts/screenshot.js [tab_name]
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const TABS = ['carte', 'matrice', 'heritage', 'traites', 'conflit', 'textes', 'clusters', 'figures'];
const SRC_DIR = path.join(__dirname, '..', 'src');
const OUT_DIR = path.join(__dirname, '..', 'tmp', 'screenshots');

async function run(targetTab) {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  // Use Playwright's built-in Chromium (not Windows Chrome)
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const fileUrl = `file://${path.resolve(SRC_DIR, 'index.html')}`;
  console.log(`Loading: ${fileUrl}`);

  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);

  const tabs = targetTab ? [targetTab] : TABS;

  for (const tab of tabs) {
    const btn = await page.$(`[data-tab="${tab}"]`);
    if (!btn) { console.log(`Skip: ${tab}`); continue; }
    await btn.click();
    await page.waitForTimeout(2000);

    // Viewport screenshot
    await page.screenshot({ path: path.join(OUT_DIR, `${tab}_viewport.png`) });
    console.log(`✓ ${tab}_viewport.png`);

    // Full tab content
    const panel = await page.$(`#tab-${tab}`);
    if (panel) {
      await panel.screenshot({ path: path.join(OUT_DIR, `${tab}_full.png`) });
      console.log(`✓ ${tab}_full.png`);
    }
  }

  // Post-conflit mode variations
  if (!targetTab || targetTab === 'conflit') {
    await page.click('[data-tab="conflit"]');
    await page.waitForTimeout(1500);
    for (const mode of ['pc', 'combined', 'score']) {
      const modeBtn = await page.$(`[data-cmode="${mode}"]`);
      if (modeBtn) {
        await modeBtn.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(OUT_DIR, `conflit_mode_${mode}.png`) });
        console.log(`✓ conflit_mode_${mode}.png`);
      }
    }
  }

  await browser.close();
  console.log(`\nScreenshots saved to ${OUT_DIR}`);
}

run(process.argv[2]).catch(e => { console.error(e.message); process.exit(1); });
