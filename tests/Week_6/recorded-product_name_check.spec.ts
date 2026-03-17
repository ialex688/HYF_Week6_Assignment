import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://raider-test-site.onrender.com/');
  await page.getByRole('link', { name: 'Apparel & Accessories' }).click();
  await page.getByRole('link', { name: 'BeneFit Girl Meets Pearl' }).click();
  await page.getByRole('heading', { name: 'BeneFit Girl Meets Pearl' }).click();
});