import { chromium } from 'playwright';

async function capture() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1194, height: 834 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:8088/demo.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // 1. Style 1: Candy
  await page.screenshot({ path: 'demo_style_1_candy.png' });
  console.log('Saved demo_style_1_candy.png');

  // 2. Style 2: Starry
  await page.click("button[data-target='starry']");
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'demo_style_2_starry.png' });
  console.log('Saved demo_style_2_starry.png');

  // 3. Style 3: Drawer
  await page.click("button[data-target='drawer']");
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'demo_style_3_drawer.png' });
  console.log('Saved demo_style_3_drawer.png');

  await browser.close();
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
