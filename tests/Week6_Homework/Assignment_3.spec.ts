import { test, expect } from '@playwright/test';


test('product_detail_test', async ({page}) => {
    await page.goto('/');
    const count = await page.locator(".product-card").count();
    console.log(count);
    var i = 1
    for (i; i<count+1; i++) {
        const name = await page.locator('body > main > div > div:nth-child('+ i +') > a > div.product-info > h3').innerText() ;        
        const category = await page.locator('body > main > div > div:nth-child('+ i +') > a > div.product-info > span.product-category').innerText() ;        
        const price = await page.locator('body > main > div > div:nth-child('+ i +') > a > div.product-info > span.product-price').innerText() ;
        

        await page.locator('body > main > div > div:nth-child('+i+') > a').click();

///// Testing if the product detail page opens.
        await expect(page).toHaveURL('/product/'+i);     


///// Testing if the product detail page shows the correct information as the product page.

        const product_name = await page.locator('body > main > div > div > div.product-detail-info > h1').innerText() ;
        expect(product_name).toBe(name);

        const product_category = await page.locator('body > main > div > div > div.product-detail-info > span').innerText() ;
        expect(product_category).toBe(category);

        const product_price = await page.locator('body > main > div > div > div.product-detail-info > p.product-detail-price').innerText() ;
        expect(product_price).toBe(price);

        await page.goBack();
    }
})