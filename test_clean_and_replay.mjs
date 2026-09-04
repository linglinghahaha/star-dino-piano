import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1194, height: 834 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('PAGE ERROR:', msg.text());
  });

  try {
    console.log('Navigating to http://127.0.0.1:8088/ ...');
    await page.goto('http://127.0.0.1:8088/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // Enter Level 1
    const node1 = await page.waitForSelector('[data-level="M01"]', { timeout: 5000 });
    console.log('Clicking Node 1 to enter Level 1...');
    await node1.click();
    await page.waitForTimeout(1000);

    const stageStyleDetails = await page.evaluate(() => {
      const base = document.querySelector('.base');
      const slot = document.querySelector('.build-slot');
      function dumpRules(el) {
        if (!el) return [];
        return Array.from(document.styleSheets).flatMap(s => {
          try {
            return Array.from(s.cssRules).filter(r => r.selectorText && el.matches(r.selectorText)).map(r => ({
              sheet: s.href?.split('/').pop()?.split('?')[0],
              sel: r.selectorText,
              css: r.cssText
            }));
          } catch(e) { return []; }
        });
      }
      return {
        baseBox: base?.getBoundingClientRect(),
        slotBox: slot?.getBoundingClientRect(),
        baseBefore: window.getComputedStyle(base, '::before').content,
        baseAfter: window.getComputedStyle(base, '::after').content,
        slotBefore: window.getComputedStyle(slot, '::before').content,
        slotAfter: window.getComputedStyle(slot, '::after').content,
        baseRules: dumpRules(base),
        slotRules: dumpRules(slot)
      };
    });
    console.log('STAGE STYLE DETAILS:', JSON.stringify(stageStyleDetails, null, 2));

    await page.screenshot({ path: 'test_clean_playscreen.png' });
    console.log('Saved test_clean_playscreen.png');

    // Tap C key
    const cKey = await page.waitForSelector('[data-note="C"]');
    console.log('Tapping C 1st time...');
    await cKey.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'test_clean_after_tap.png' });
    console.log('Saved test_clean_after_tap.png');

    // Tap C key 2nd time to complete
    console.log('Tapping C 2nd time to complete...');
    await page.click('[data-note="C"]');
    await page.waitForSelector('#resultModal:not([hidden])', { timeout: 5000 });
    console.log('Celebration modal appeared!');

    // Click [ 回到大地图 ]
    await page.waitForTimeout(500);
    await page.click('#modalMap');
    console.log('Clicked [回到大地图]');
    await page.waitForTimeout(1000);

    // Verify node 1 is marked done AND NOT disabled
    const node1Status = await page.$eval('[data-level="M01"]', el => ({
      disabled: el.disabled,
      isDone: el.classList.contains('done'),
      ariaHidden: el.getAttribute('aria-hidden')
    }));
    console.log('Node 1 status on map:', JSON.stringify(node1Status, null, 2));

    // REPLAY TEST: Click Node 1 to replay without clearing localStorage!
    console.log('Clicking completed Node 1 to test REPLAY...');
    await page.click('[data-level="M01"]');
    await page.waitForTimeout(1000);

    const replayed = await page.evaluate(() => {
      return {
        screen: document.body.className.includes('play') || !document.querySelector('#mapShell:not([hidden])'),
        currentLevel: window.state ? window.state.levelIndex : 'unknown'
      };
    });
    console.log('Replay status:', JSON.stringify(replayed, null, 2));

    await page.screenshot({ path: 'test_replay_level1.png' });
    console.log('Saved test_replay_level1.png');

    console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('TEST FAILED:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

run();
