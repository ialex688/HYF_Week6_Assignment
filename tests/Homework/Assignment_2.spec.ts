import { test, expect } from '@playwright/test';

test('nav_tests', async ({page}) => {
    await page.goto('/');
    await page.locator('body > header > nav > div > ul > li:nth-child(1) > a').click();
    await expect(page).toHaveURL('/');
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    await page.locator('body > header > nav > div > ul > li:nth-child(2) > a').click();
    await expect(page).toHaveURL('/?category=Apparel');
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    await page.locator('body > header > nav > div > ul > li:nth-child(3) > a').click();
    await expect(page).toHaveURL('/?category=Makeup');
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    await page.locator('body > header > nav > div > ul > li:nth-child(4) > a').click();
    await expect(page).toHaveURL('/?category=Skincare');
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    await page.locator('body > header > nav > div > ul > li:nth-child(5) > a').click();
    await expect(page).toHaveURL('/?category=Fragrance');
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    await page.locator('body > header > nav > div > ul > li:nth-child(6) > a').click();
    await expect(page).toHaveURL('/?category=Men');
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    await page.locator('body > header > nav > div > ul > li:nth-child(7) > a').click();
    await expect(page).toHaveURL('/?category=Hair%20Care');
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    await page.locator('body > header > nav > div > ul > li:nth-child(8) > a').click();
    await expect(page).toHaveURL('/?category=Books');
    await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();

    
})



test('nav_tests_copy', async ({page}) => {
    await page.goto('/');
    let i = 1
    for (i; i < 9; i++) {
        let href = await page.locator('body > header > nav > div > ul > li:nth-child('+i+') > a').getAttribute('href');
        if (href == "/?category=Hair Care") {
            href = "/?category=Hair%20Care"; 
        } 
        console.log(href);
        await page.locator('body > header > nav > div > ul > li:nth-child('+i+') > a').click();
        const currentUrl = await page.url();
        const expectedUrl = 'https://raider-test-site.onrender.com'+href;
        console.log(currentUrl);
        console.log(expectedUrl);
        expect(currentUrl).toEqual(expectedUrl);
        await expect(page.getByRole('heading', { name: 'Featured Products' })).toBeVisible();
    }
})
