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


//---------------------------------------------//
// Exercise 7: Expand Tests and Debug Failures //
// Part B: Add more tests  --------------------//
//---------------------------------------------//


//----------------------------------------------------------------------------------//
// 4. Add a test: navigate to Products page, verify at least one product is visible //
//----------------------------------------------------------------------------------//


test('verify_product', async ({page}) => {
    await page.goto('/');
    const count = await page.locator(".product-card").count();
    console.log(count);

    await expect(count).toBeGreaterThanOrEqual(1);
})


//----------------------------------------------------------------------//
// 5. Add a test: click a product, verify the product detail page loads //
//----------------------------------------------------------------------//


test('verify_product_detail', async ({page}) => {
    await page.goto('/');
    const count = await page.locator(".product-card").count();
    console.log(count);
    var i = 1
    for (i; i<count+1; i++) {
        await page.locator('body > main > div > div:nth-child('+i+') > a').click();
        await expect(page).toHaveURL('/product/'+i);     
        await page.goBack();
    }
})


//-----------------------------------------------------------//
// 6. Add a test: use the navigation menu to visit each page //
//-----------------------------------------------------------//


test('nav_menu', async ({page}) => {
    await page.goto('/');
    await page.locator('body > header > nav > div > ul > li:nth-child(1) > a').click();
    await expect(page).toHaveURL('/');
    await page.locator('body > header > nav > div > ul > li:nth-child(2) > a').click();
    await expect(page).toHaveURL('/?category=Apparel');
    await page.locator('body > header > nav > div > ul > li:nth-child(3) > a').click();
    await expect(page).toHaveURL('/?category=Makeup');
    await page.locator('body > header > nav > div > ul > li:nth-child(4) > a').click();
    await expect(page).toHaveURL('/?category=Skincare');
    await page.locator('body > header > nav > div > ul > li:nth-child(5) > a').click();
    await expect(page).toHaveURL('/?category=Fragrance');
    await page.locator('body > header > nav > div > ul > li:nth-child(6) > a').click();
    await expect(page).toHaveURL('/?category=Men');
    await page.locator('body > header > nav > div > ul > li:nth-child(7) > a').click();
    await expect(page).toHaveURL('/?category=Hair%20Care');
    await page.locator('body > header > nav > div > ul > li:nth-child(8) > a').click();
    await expect(page).toHaveURL('/?category=Books');

    
})


//-------------------------------------------------//
// I tried another way to do the previous exercise //
//-------------------------------------------------// 


test('nav_menu_copy', async ({page}) => {
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
    }
})

//------------------------------------------------------//
// 7. Intentionally break a test (use a wrong selector) //
//------------------------------------------------------//

test('break_a_test', async ({page}) => {
    await page.goto('/');
    await page.locator('body >  nav > div > ul > li:nth-child(1) > a').click();
    await expect(page).toHaveURL('/');
    await page.locator('body > header > nav > div > ul > li:nth-child(2) > a').click();
    await expect(page).toHaveURL('/?category=Apparel');
    await page.locator('body > header > nav > div > ul > li:nth-child(3) > a').click();
    await expect(page).toHaveURL('/?category=Makeup');
    await page.locator('body > header > nav > div > ul > li:nth-child(4) > a').click();
    await expect(page).toHaveURL('/?category=Skincare');
    await page.locator('body > header > nav > div > ul > li:nth-child(5) > a').click();
    await expect(page).toHaveURL('/?category=Fragrance');
    await page.locator('body > header > nav > div > ul > li:nth-child(6) > a').click();
    await expect(page).toHaveURL('/?category=Men');
    await page.locator('body > header > nav > div > ul > li:nth-child(7) > a').click();
    await expect(page).toHaveURL('/?category=Hair%20Care');
    await page.locator('body > header > nav > div > ul > li:nth-child(8) > a').click();
    await expect(page).toHaveURL('/?category=Books');

    
})

