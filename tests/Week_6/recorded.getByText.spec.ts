import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://raider-test-site.onrender.com/');
  await page.getByText('Login or register').click();
  await page.getByLabel('Login name').click();
  await page.getByLabel('Password').click();
  await page.locator('#loginFrm > div.form-actions > button').getByText('Login').click();
  await page.getByText('Apparel & Accessories').click();
  await page.getByText('Skinsheen Bronzer Stick').click();
});