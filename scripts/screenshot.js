#!/usr/bin/env node
/**
 * Screenshot tool using Windows Chrome from WSL.
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

  // Use Windows Chrome from WSL
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/mnt/c/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // Convert WSL path to Windows file:// URL
  const wslPath = path.join(SRC_DIR, 'index.html');
  const winPath = wslPath.replace('/home/victo/', '\\\\wsl$\\Ubuntu\\home\\victo\\').replace(/\//g, '\\');
  const fileUrl = `file:///${winPath}`;

  console.log(`Loading: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);

  const tabs = targetTab ? [targetTab] : TABS;

  for (const tab of tabs) {
    const btn = await page.$(`[data-tab="${tab}"]`);
    if (!btn) { console.log(`Skip: ${tab}`); continue; }
    await btn.click();
    await page.waitForTimeout(2000);

    // Viewport screenshot (what the user sees at 100% zoom)
    await page.screenshot({ path: path.join(OUT_DIR, `${tab}_viewport.png`) });
    console.log(`✓ ${tab}_viewport.png`);

    // Full page screenshot of the tab panel
    const panel = await page.$(`#tab-${tab}`);
    if (panel) {
      await panel.screenshot({ path: path.join(OUT_DIR, `${tab}_full.png`) });
      console.log(`✓ ${tab}_full.png`);
    }
  }

  // Post-conflit modes
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
  console.log(`\nDone: ${OUT_DIR}`);
}

run(process.argv[2]).catch(e => { console.error(e.message); process.exit(1); });
