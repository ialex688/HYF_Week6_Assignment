import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://raider-test-site.onrender.com/');
  await page.getByRole('link', { name: 'Login or register' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).click();
  await page.getByRole('textbox', { name: 'Login name' }).fill('aguspe');
  await page.getByRole('textbox', { name: 'Login name' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).press('Tab');
  await page.getByRole('textbox', { name: 'Apples' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123421234');
  await page.getByRole('button', { name: 'Login' }).click();
});