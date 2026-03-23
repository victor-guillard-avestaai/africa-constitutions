#!/usr/bin/env node
/**
 * Dashboard Evaluation Suite
 *
 * Comprehensive automated testing: screenshots all tabs in all states,
 * interacts with controls, captures errors, and reports issues.
 *
 * Usage:
 *   node scripts/eval-dashboard.js              # Full eval
 *   node scripts/eval-dashboard.js --tab=conflit # Single tab
 *   node scripts/eval-dashboard.js --quick       # Viewport-only (fast)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SRC = path.resolve(__dirname, '..', 'src');
const OUT = path.resolve(__dirname, '..', 'tmp', 'eval');

const ISSUES = [];
function issue(tab, severity, msg) {
  ISSUES.push({ tab, severity, msg });
  console.log(`  [${severity}] ${msg}`);
}

async function evalTab(page, tab, quick) {
  console.log(`\n═══ ${tab.toUpperCase()} ═══`);
  const btn = await page.$(`[data-tab="${tab}"]`);
  if (!btn) { issue(tab, 'CRITICAL', 'Tab button not found'); return; }
  await btn.click();
  await page.waitForTimeout(2000);

  // Check for JS errors
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));

  // Viewport screenshot
  await page.screenshot({ path: path.join(OUT, `${tab}_viewport.png`) });

  // Full tab screenshot
  const panel = await page.$(`#tab-${tab}`);
  if (panel) {
    const box = await panel.boundingBox();
    if (box && box.height > 2000) {
      issue(tab, 'WARN', `Tab content very tall: ${Math.round(box.height)}px — may require too much scrolling`);
    }
    await panel.screenshot({ path: path.join(OUT, `${tab}_full.png`) });
  }

  // Check for empty containers (charts that didn't render)
  const emptySvgs = await page.$$eval(`#tab-${tab} svg`, svgs =>
    svgs.filter(s => s.childElementCount <= 1).length
  );
  if (emptySvgs > 0) {
    issue(tab, 'ERROR', `${emptySvgs} SVG element(s) appear empty (≤1 child)`);
  }

  // Check for overflowing content
  const overflow = await page.evaluate((tabId) => {
    const el = document.getElementById(tabId);
    if (!el) return false;
    return el.scrollWidth > el.clientWidth;
  }, `tab-${tab}`);
  if (overflow) {
    issue(tab, 'WARN', 'Horizontal overflow detected');
  }

  if (quick) return;

  // ─── Tab-specific interactions ───

  if (tab === 'carte') {
    // Test all 3 modes
    for (const mode of ['score', 'combined', 'heritage']) {
      const modeBtn = await page.$(`[data-mode="${mode}"]`);
      if (modeBtn) {
        await modeBtn.click();
        await page.waitForTimeout(800);
        await page.screenshot({ path: path.join(OUT, `carte_mode_${mode}.png`) });
      }
    }
    // Test dimension toggle
    const dimBtns = await page.$$('.dim-btn');
    if (dimBtns.length !== 10) {
      issue(tab, 'ERROR', `Expected 10 dimension buttons, found ${dimBtns.length}`);
    }
    // Click a dimension off then back on
    if (dimBtns.length > 0) {
      await dimBtns[0].click();
      await page.waitForTimeout(300);
      await dimBtns[0].click();
    }
  }

  if (tab === 'matrice') {
    // Test heritage filter
    const francoBtn = await page.$('[data-hf="francophone"]');
    if (francoBtn) {
      await francoBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `matrice_filter_franco.png`) });
      // Check row count
      const rows = await page.$$('#heatmap-table tbody tr');
      if (rows.length !== 23) {
        issue(tab, 'WARN', `Francophone filter: expected 23 rows, got ${rows.length}`);
      }
      // Reset
      const allBtn = await page.$('[data-hf="all"]');
      if (allBtn) await allBtn.click();
      await page.waitForTimeout(300);
    }
    // Test conflict filter
    const pcBtn = await page.$('[data-cf="post-conflict"]');
    if (pcBtn) {
      await pcBtn.click();
      await page.waitForTimeout(500);
      const rows = await page.$$('#heatmap-table tbody tr');
      if (rows.length !== 13) {
        issue(tab, 'WARN', `Post-conflict filter: expected 13 rows, got ${rows.length}`);
      }
      await page.screenshot({ path: path.join(OUT, `matrice_filter_pc.png`) });
      const allBtn = await page.$('[data-cf="all"]');
      if (allBtn) await allBtn.click();
    }
    // Test cross-filter
    const francoBtn2 = await page.$('[data-hf="francophone"]');
    const peaceBtn = await page.$('[data-cf="peace"]');
    if (francoBtn2 && peaceBtn) {
      await francoBtn2.click();
      await page.waitForTimeout(300);
      await peaceBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `matrice_cross_filter.png`) });
      // Reset both
      const allH = await page.$('[data-hf="all"]');
      const allC = await page.$('[data-cf="all"]');
      if (allH) await allH.click();
      if (allC) await allC.click();
    }
  }

  if (tab === 'traites') {
    // Test filter toggles
    const toggles = await page.$$('.scatter-toggle');
    if (toggles.length < 5) {
      issue(tab, 'ERROR', `Expected ≥5 scatter toggles, found ${toggles.length}`);
    }
    // Toggle off anglophone
    const angloToggle = await page.$('[data-sh="anglophone"]');
    if (angloToggle) {
      await angloToggle.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `traites_no_anglo.png`) });
      await angloToggle.click(); // re-enable
    }
  }

  if (tab === 'conflit') {
    // Test all 3 map modes
    for (const mode of ['pc', 'combined', 'score']) {
      const modeBtn = await page.$(`[data-cmode="${mode}"]`);
      if (modeBtn) {
        await modeBtn.click();
        await page.waitForTimeout(1000);
        await page.screenshot({ path: path.join(OUT, `conflit_mode_${mode}.png`) });
      }
    }
    // Scroll to comparison
    const comp = await page.$('.conflit-comparison');
    if (comp) {
      await comp.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `conflit_comparison.png`) });
    }
    // Scroll to dimensions
    const dims = await page.$('#conflit-dimensions-chart');
    if (dims) {
      await dims.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `conflit_dimensions.png`) });
    }
    // Check bar colors (heritage-colored, not beige)
    const bars = await page.$$eval('.cc-bar', els =>
      els.map(el => ({ bg: el.style.backgroundColor, w: el.style.width }))
    );
    const beigeBars = bars.filter(b => !b.bg || b.bg === '' || b.bg === 'transparent');
    if (beigeBars.length > 0) {
      issue(tab, 'ERROR', `${beigeBars.length} comparison bars have no color (beige bug)`);
    }
  }

  if (tab === 'clusters') {
    // Check UMAP renders
    const umapSvgs = await page.$$('#umap-container svg, .umap-grid svg');
    if (umapSvgs.length === 0) {
      issue(tab, 'ERROR', 'No UMAP SVGs found');
    }
    // Scroll to dendrogram
    const dendro = await page.$('#dendrogram-container');
    if (dendro) {
      await dendro.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(OUT, `clusters_dendrogram.png`) });
    }
    // Test threshold slider (if present)
    const handle = await page.$('.threshold-line');
    if (handle) {
      const hBox = await handle.boundingBox();
      if (hBox) {
        // Drag slider to the left (more clusters)
        await page.mouse.move(hBox.x + hBox.width/2, hBox.y + hBox.height/2);
        await page.mouse.down();
        await page.mouse.move(hBox.x - 100, hBox.y + hBox.height/2, { steps: 10 });
        await page.mouse.up();
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(OUT, `clusters_threshold_moved.png`) });
      }
    }
    // Check cluster composition
    const compPanel = await page.$('#cluster-composition');
    if (compPanel) {
      const text = await compPanel.textContent();
      if (!text || text.length < 10) {
        issue(tab, 'WARN', 'Cluster composition panel appears empty');
      }
    }
  }

  if (tab === 'textes') {
    // Check all 3 charts render
    for (const chartId of ['#sovereignty-chart', '#peoples-chart', '#sd-posture-chart']) {
      const chart = await page.$(chartId);
      if (!chart) {
        issue(tab, 'ERROR', `Chart container ${chartId} not found`);
      } else {
        const svgs = await chart.$$('svg');
        if (svgs.length === 0) {
          issue(tab, 'ERROR', `No SVG in ${chartId}`);
        }
      }
    }
  }

  if (tab === 'figures') {
    // Check figure count
    const cards = await page.$$('.fig-gallery-card');
    if (cards.length < 30) {
      issue(tab, 'WARN', `Expected ~36 figure cards, found ${cards.length}`);
    }
  }

  // Test language toggle
  const langBtn = await page.$('#lang-toggle');
  if (langBtn) {
    await langBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(OUT, `${tab}_en.png`) });
    await langBtn.click(); // switch back
    await page.waitForTimeout(500);
  }

  if (errors.length > 0) {
    errors.forEach(e => issue(tab, 'ERROR', `JS error: ${e}`));
  }
}

async function main() {
  const args = process.argv.slice(2);
  const quick = args.includes('--quick');
  const tabArg = args.find(a => a.startsWith('--tab='));
  const targetTab = tabArg ? tabArg.split('=')[1] : null;

  fs.mkdirSync(OUT, { recursive: true });
  fs.readdirSync(OUT).forEach(f => fs.unlinkSync(path.join(OUT, f)));

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // Collect JS errors globally
  const globalErrors = [];
  page.on('pageerror', e => globalErrors.push(e.message));

  await page.goto(`file://${path.resolve(SRC, 'index.html')}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(4000);

  const TABS = ['carte', 'matrice', 'heritage', 'traites', 'conflit', 'textes', 'clusters', 'figures'];
  const tabs = targetTab ? [targetTab] : TABS;

  for (const tab of tabs) {
    await evalTab(page, tab, quick);
  }

  await browser.close();

  // ═══ Report ═══
  console.log('\n' + '═'.repeat(60));
  console.log('DASHBOARD EVALUATION REPORT');
  console.log('═'.repeat(60));

  const files = fs.readdirSync(OUT).filter(f => f.endsWith('.png'));
  console.log(`\nScreenshots: ${files.length}`);

  if (ISSUES.length === 0) {
    console.log('\n✅ No issues found!');
  } else {
    const critical = ISSUES.filter(i => i.severity === 'CRITICAL');
    const errors = ISSUES.filter(i => i.severity === 'ERROR');
    const warns = ISSUES.filter(i => i.severity === 'WARN');
    console.log(`\nIssues: ${critical.length} critical, ${errors.length} errors, ${warns.length} warnings`);
    ISSUES.forEach(i => console.log(`  [${i.severity}] ${i.tab}: ${i.msg}`));
  }

  if (globalErrors.length > 0) {
    console.log(`\nGlobal JS errors: ${globalErrors.length}`);
    [...new Set(globalErrors)].forEach(e => console.log(`  ${e}`));
  }

  console.log(`\nScreenshots saved to: ${OUT}`);
  process.exit(ISSUES.filter(i => i.severity === 'CRITICAL' || i.severity === 'ERROR').length > 0 ? 1 : 0);
}

main().catch(e => { console.error(e.message); process.exit(1); });
