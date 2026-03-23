#!/usr/bin/env node
/**
 * Dashboard screenshot & evaluation tool.
 *
 * Usage:
 *   node scripts/screenshot.js              # All tabs, viewport + full
 *   node scripts/screenshot.js conflit      # Single tab
 *   node scripts/screenshot.js --all-modes  # All tabs + all mode variations
 *   node scripts/screenshot.js --interact   # Take screenshots with interactions (hover, click)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const TABS = ['carte', 'matrice', 'heritage', 'traites', 'conflit', 'textes', 'clusters', 'figures'];
const SRC_DIR = path.join(__dirname, '..', 'src');
const OUT_DIR = path.join(__dirname, '..', 'tmp', 'screenshots');

async function run() {
  const args = process.argv.slice(2);
  const allModes = args.includes('--all-modes');
  const interact = args.includes('--interact');
  const targetTab = args.find(a => !a.startsWith('--'));

  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Clean old screenshots
  fs.readdirSync(OUT_DIR).forEach(f => fs.unlinkSync(path.join(OUT_DIR, f)));

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const fileUrl = `file://${path.resolve(SRC_DIR, 'index.html')}`;
  await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);

  const tabs = targetTab ? [targetTab] : TABS;

  for (const tab of tabs) {
    const btn = await page.$(`[data-tab="${tab}"]`);
    if (!btn) { console.log(`Skip: ${tab}`); continue; }
    await btn.click();
    await page.waitForTimeout(2000);

    // Viewport (what user sees at 100% zoom)
    await page.screenshot({ path: path.join(OUT_DIR, `${tab}_viewport.png`) });
    console.log(`✓ ${tab}_viewport.png`);

    // Full tab content (scrollable)
    const panel = await page.$(`#tab-${tab}`);
    if (panel) {
      await panel.screenshot({ path: path.join(OUT_DIR, `${tab}_full.png`) });
      console.log(`✓ ${tab}_full.png`);
    }
  }

  // ═══ Tab-specific interaction screenshots ═══

  // Carte: all 3 modes
  if (allModes && (!targetTab || targetTab === 'carte')) {
    await page.click('[data-tab="carte"]');
    await page.waitForTimeout(1500);
    for (const mode of ['score', 'combined', 'heritage']) {
      const btn = await page.$(`[data-mode="${mode}"]`);
      if (btn) {
        await btn.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(OUT_DIR, `carte_mode_${mode}.png`) });
        console.log(`✓ carte_mode_${mode}.png`);
      }
    }
  }

  // Post-conflit: all 3 modes + scroll to comparison + scroll to dimension
  if (!targetTab || targetTab === 'conflit') {
    await page.click('[data-tab="conflit"]');
    await page.waitForTimeout(1500);

    if (allModes) {
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

    // Scroll to comparison section
    const comparison = await page.$('.conflit-comparison');
    if (comparison) {
      await comparison.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT_DIR, `conflit_comparison.png`) });
      console.log(`✓ conflit_comparison.png`);
    }

    // Scroll to dimension chart
    const dimChart = await page.$('#conflit-dimensions-chart');
    if (dimChart) {
      await dimChart.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT_DIR, `conflit_dimensions.png`) });
      console.log(`✓ conflit_dimensions.png`);
    }
  }

  // Traités: test filter toggles
  if (interact && (!targetTab || targetTab === 'traites')) {
    await page.click('[data-tab="traites"]');
    await page.waitForTimeout(1500);
    // Toggle off anglophone
    const angloBtn = await page.$('[data-sh="anglophone"]');
    if (angloBtn) {
      await angloBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT_DIR, `traites_filter_noanglo.png`) });
      console.log(`✓ traites_filter_noanglo.png`);
      await angloBtn.click(); // re-enable
    }
  }

  // Clusters: scroll to dendrogram, move threshold
  if (!targetTab || targetTab === 'clusters') {
    await page.click('[data-tab="clusters"]');
    await page.waitForTimeout(2000);

    const dendro = await page.$('#dendrogram-container');
    if (dendro) {
      await dendro.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT_DIR, `clusters_dendrogram.png`) });
      console.log(`✓ clusters_dendrogram.png`);
    }
  }

  // Matrice: test heritage filter
  if (interact && (!targetTab || targetTab === 'matrice')) {
    await page.click('[data-tab="matrice"]');
    await page.waitForTimeout(1500);
    const francoBtn = await page.$('[data-hf="francophone"]');
    if (francoBtn) {
      await francoBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT_DIR, `matrice_filter_franco.png`) });
      console.log(`✓ matrice_filter_franco.png`);
    }
  }

  // EN language toggle
  if (allModes) {
    const langBtn = await page.$('#lang-toggle');
    if (langBtn) {
      await langBtn.click();
      await page.waitForTimeout(1500);
      await page.click('[data-tab="carte"]');
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(OUT_DIR, `carte_en.png`) });
      console.log(`✓ carte_en.png`);
      // Switch back
      await langBtn.click();
      await page.waitForTimeout(500);
    }
  }

  await browser.close();

  // Summary
  const files = fs.readdirSync(OUT_DIR).filter(f => f.endsWith('.png'));
  console.log(`\n═══ ${files.length} screenshots saved to ${OUT_DIR} ═══`);
  files.forEach(f => {
    const size = fs.statSync(path.join(OUT_DIR, f)).size;
    console.log(`  ${f} (${(size/1024).toFixed(0)}KB)`);
  });
}

run().catch(e => { console.error(e.message); process.exit(1); });
