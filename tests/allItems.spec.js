import { test, expect } from '@playwright/test';

const { USER_NAME, PASSWORD } = require('../variables')


test('Verify that the Shopping Cart Button Opens "your cart" page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await page.locator('#shopping_cart_container').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html')

})

test('Ensure that Facebook link icon enable to redirect to facebook page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    // Start listening for the popup before triggering it
    const popupPromise = page.waitForEvent('popup');

    // Click that triggers the popup
    await page.locator('data-test=social-facebook').click();

    // Wait for the popup promise to resolve
    const [newPage] = await Promise.all([
        popupPromise
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.facebook.com/saucelabs');
})

test('Ensure that Twitter link icon enable to redirect to Twitter page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    // Start listening for the popup before triggering it
    const popupPromise = page.waitForEvent('popup');

    // Click that triggers the popup
    await page.locator('data-test=social-twitter').click();

    // Wait for the popup promise to resolve
    const [newPage] = await Promise.all([
        popupPromise
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://twitter.com/saucelabs');
})

test('Ensure that Linkedin link icon enable to redirect to Linkedin page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();

    // Start listening for the popup before triggering it
    const popupPromise = page.waitForEvent('popup');

    // Click that triggers the popup
    await page.locator('data-test=social-linkedin').click();

    // Wait for the popup promise to resolve
    const [newPage] = await Promise.all([
        popupPromise
    ]);

    await newPage.waitForLoadState();
    await expect(newPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
})

test('Verify that products list is available to display on the page', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await expect(page.locator('#item_4_title_link')).toHaveText('Sauce Labs Backpack')
    await expect(page.locator('#item_0_title_link')).toHaveText('Sauce Labs Bike Light')
   
})

test('Ensure that each product listed includes the product name, description, price, and "Add to Cart" button', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Login steps
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    const productsObject = {
        1: {
            productName: 'Sauce Labs Backpack',
            description: 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
            price: '$29.99',
        },
        2: {
            productName: 'Sauce Labs Bike Light',
            description: "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.",
            price: '$9.99',
        },

        3:{
            productName: 'Sauce Labs Bolt T-Shirt',
            description: 'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.',
            price: '$15.99',
        },

        4:{
            productName: 'Sauce Labs Fleece Jacket',
            description: "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.",
            price: '$49.99',
        },

        5:{
            productName: 'Sauce Labs Onesie',
            description: "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.",
            price: '$7.99',
        },

        6:{
            productName: 'Test.allTheThings() T-Shirt (Red)',
            description: "This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.",
            price: '$15.99',
        }
    }
    for(let key  of Object.keys(productsObject)){
        
        let product = productsObject[key]
         
        await expect(page.locator('.inventory_item_name ').nth(key-1)).toHaveText(product.productName);
        await expect(page.locator('.inventory_item_desc').nth(key-1)).toHaveText(product.description);
        await expect(page.locator('.inventory_item_price').nth(key-1)).toHaveText(product.price);
        await expect(page.locator('.inventory_item_description > .pricebar > .btn_inventory ').nth(key-1)).toBeVisible();
    }   

});

test('Verify that "Add to cart" button is avaible to click any each product', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await page.waitForSelector('.inventory_list');
    const productButton = {
        1: 'add-to-cart-sauce-labs-backpack',
        2: 'add-to-cart-sauce-labs-bike-light',
        3: 'add-to-cart-sauce-labs-bolt-t-shirt',
        4: 'add-to-cart-sauce-labs-fleece-jacket',
        5: 'add-to-cart-sauce-labs-onesie',
        6: 'add-to-cart-test.allthethings()-t-shirt-(red)'
    };
   
    for (const key in productButton) {
        const buttonSelector = `[data-test="${productButton[key]}"]`;
        const button = page.locator(buttonSelector);        
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
    }
    
})

test('Verify that the product is added to the shopping cart successfully', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
    await page.locator('#shopping_cart_container').click()
    await expect(page.locator('#item_4_title_link')).toHaveText('Sauce Labs Backpack')  
})

test('Verify that the shopping cart icon at the top-right corner reflects the correct number of items added', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
    await page.locator('#add-to-cart-sauce-labs-bike-light').click()
    await expect(page.locator('data-test=shopping-cart-badge')).toHaveText('2')
})

test('Verify that all the added products are displayed in the shopping cart', async ({ page }) => {
    await page.goto('/');
    await page.locator('#user-name').fill(USER_NAME);
    await page.locator('#password').fill(PASSWORD);
    await page.locator('#login-button').click();
    await page.waitForSelector('.inventory_list');
    const productButton = {
        1: 'add-to-cart-sauce-labs-backpack',
        2: 'add-to-cart-sauce-labs-bike-light',
        3: 'add-to-cart-sauce-labs-bolt-t-shirt',
        4: 'add-to-cart-sauce-labs-fleece-jacket',
        5: 'add-to-cart-sauce-labs-onesie',
        6: 'add-to-cart-test.allthethings()-t-shirt-(red)'
    };
   
    for (const key in productButton) {
        const buttonSelector = `[data-test="${productButton[key]}"]`;
        await page.locator(buttonSelector).click();;    
    }
    await page.locator('#shopping_cart_container').click();
    const addedProducts = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt',
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Onesie',
        'Test.allTheThings() T-Shirt (Red)'
    ];

    for(const key in addedProducts) {
        const productName = addedProducts[key];
        const itemSelector = `.inventory_item_name:has-text("${productName}")`;
        await expect(page.locator(itemSelector)).toBeVisible();
    }
})

