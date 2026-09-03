import { chromium } from 'playwright';

async function run() {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1194, height: 834 },
    deviceScaleFactor: 2
  });
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERR:', err.message));
  await page.goto('http://127.0.0.1:8088/', { waitUntil: 'networkidle' });

  // Enter Lesson 1
  await page.click('.phase-hub-1 .node-1');
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'test_play_initial.png' });
  console.log('Saved test_play_initial.png');

  // Click C (MIDI 60) key
  const c4Btn = await page.$('[data-note="C"], [data-midi="60"], .white-key[data-note="C"]');
  if (c4Btn) {
    console.log('Found C button');
    await c4Btn.click();
    console.log('Clicked C 1st time');
    await page.waitForTimeout(400);
    await page.screenshot({ path: 'test_play_tap_c1.png' });
    console.log('Saved test_play_tap_c1.png');

    await page.waitForTimeout(1200);
    await page.screenshot({ path: 'test_play_after_c1.png' });
    console.log('Saved test_play_after_c1.png');

    // Click again to trigger completion (re-query element since DOM re-rendered)
    await page.click('[data-note="C"]');
    console.log('Clicked C 2nd time');
    await page.waitForSelector('#resultModal:not([hidden])', { timeout: 5000 });
    console.log('resultModal appeared!');
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'test_play_settlement.png' });
    console.log('Saved test_play_settlement.png');

    // Click [ 回到大地图 ]
    const mapBtn = await page.waitForSelector('#modalMap', { timeout: 5000 });
    if (mapBtn) {
      console.log('Found modalMap button, clicking it...');
      await mapBtn.click();
      await page.waitForTimeout(1200);
      await page.screenshot({ path: 'test_play_back_to_map.png' });
      console.log('Saved test_play_back_to_map.png');
    }
  } else {
    console.log('C4 button NOT found!');
  }

  await browser.close();
}

run();
