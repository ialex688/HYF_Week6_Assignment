import { test, expect } from '@playwright/test';

//---------------------------------------------//
// Exercise 6: Write a Login Test from Scratch //
//---------------------------------------------//


//--------------------------//
// Test 1: Successful login //
//--------------------------//


test('successful login', async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    await page.getByLabel("Login name").fill("aguspe");
    await page.getByLabel("Password").fill("12341234");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL(/account/);
    await expect(page.locator("body > main > div > div.account-welcome > p")).toHaveText("Welcome to your account dashboard. From here you can manage your orders and account details.");
})


//------------------------------------------//
// Test 2: Failed login with wrong password //
//------------------------------------------//


test('failed login', async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    await page.getByLabel("Login name").fill("aguspe");
    await page.getByLabel("Password").fill("1234");
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText("Error: Incorrect login or password provided.")).toBeVisible();
})


//-------------------------------//
// Test 3: Empty form submission //
//-------------------------------//


test('empty form', async ({page}) => {
    await page.goto('/');
    await page.getByRole("link", { name: 'Login or register' }).click();
    await page.getByRole('button', { name: 'Login' }).click();
    //// I couldn't inspect the popup message that appears when someone submits an empty form. 
    //// According to https://stackoverflow.com/questions/74408030/playwright-test-test-that-input-is-required
    //// the message could be displayed by the browser and not something added to the DOM
    //// So I checked that the input has the attribute required. 
    await expect(page.locator('#loginFrm_password')).toHaveAttribute('required', '');
    await expect(page.locator('#loginFrm_loginname')).toHaveAttribute('required', '');
})


