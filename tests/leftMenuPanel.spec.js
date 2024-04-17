import { test, expect } from '@playwright/test';

const { USER_NAME, PASSWORD } = require('../variables')

test('Verify that all menu items are existing', async ({ page }) => {
    
    await page.goto('/')
    await page.locator('#user-name').fill(USER_NAME)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#login-button').click()
    await page.locator('#react-burger-menu-btn').click()
    await expect(page.locator('#inventory_sidebar_link')).toHaveText('All Items')
    await expect(page.locator('#about_sidebar_link')).toHaveText('About')
    await expect(page.locator('#logout_sidebar_link')).toHaveText('Logout')
    await expect(page.locator('#reset_sidebar_link')).toHaveText('Reset App State')
    await expect(page.locator('#react-burger-cross-btn')).toBeVisible()

}) 

test('verify that with x button is possible to close the menu bar', async ({ page }) => {
    
    await page.goto('/')
    await page.locator('#user-name').fill(USER_NAME)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#login-button').click()
    await page.locator('#react-burger-menu-btn').click()
    await page.locator('#react-burger-cross-btn').click()
    await expect(page.getByText('#react-burger-cross-btn')).toBeHidden();
}) 

test('Validate Menu Item Color Change to Green on Hover', async ({ page }) => {
    
    await page.goto('/')
    await page.locator('#user-name').fill(USER_NAME)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#login-button').click()
    await page.locator('#react-burger-menu-btn').click()
    await expect(page.locator('#inventory_sidebar_link')).toHaveCSS('color', 'rgb(24, 88, 58)')
    await expect(page.locator('#about_sidebar_link')).toHaveCSS('color', 'rgb(24, 88, 58)')
    await expect(page.locator('#logout_sidebar_link')).toHaveCSS('color', 'rgb(24, 88, 58)')
    await expect(page.locator('#reset_sidebar_link')).toHaveCSS('color', 'rgb(24, 88, 58)')
    await page.locator('#inventory_sidebar_link').hover();
    await expect(page.locator('#inventory_sidebar_link')).toHaveCSS('color', 'rgb(61, 220, 145)')
    await page.locator('#about_sidebar_link').hover();
    await expect(page.locator('#about_sidebar_link')).toHaveCSS('color', 'rgb(61, 220, 145)')
    await page.locator('#logout_sidebar_link').hover();
    await expect(page.locator('#logout_sidebar_link')).toHaveCSS('color', 'rgb(61, 220, 145)')
    await page.locator('#reset_sidebar_link').hover();
    await expect(page.locator('#reset_sidebar_link')).toHaveCSS('color', 'rgb(61, 220, 145)')

}) 

test('Verify that Logout button returns to Login page', async ({ page }) => {
    
    await page.goto('/')
    await page.locator('#user-name').fill(USER_NAME)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#login-button').click()
    await page.locator('#react-burger-menu-btn').click()
    await page.locator('#logout_sidebar_link').click()
    await expect(page.locator('#login-button')).toBeVisible()

    
})

test('Confirm that selecting Reset App State cancels all chosen items on the products page.', async ({ page }) => {
    
    await page.goto('/')
    await page.locator('#user-name').fill(USER_NAME)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#login-button').click()
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
    await page.locator('#react-burger-menu-btn').click()
    await page.locator('#reset_sidebar_link').click()
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

//     const cartItems = page.locator('.shopping_cart_badge');
//     if (await cartItems.count() === 0) {
//         console.log("Cart is empty, test passed.");
//     } else {
//         console.log("Cart still has items, test failed.");
//     }
//     await expect(cartItems).toHaveCount(0);
// });

})

test('Confirm that selecting Reset App State cancels all chosen items on the your cart page.', async ({ page }) => {
    
    await page.goto('/')
    await page.locator('#user-name').fill(USER_NAME)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#login-button').click()
    await page.locator('#add-to-cart-sauce-labs-backpack').click()
    await page.locator('#shopping_cart_container').click()
    await page.locator('#react-burger-menu-btn').click()
    await page.locator('#reset_sidebar_link').click()
    await page.goto('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);

})

test('Verify that "about" button navigates to https://saucelabs.com webpage', async ({ page }) => {
    
    await page.goto('/')
    await page.locator('#user-name').fill(USER_NAME)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#login-button').click()
    await page.locator('#react-burger-menu-btn').click()
    await page.locator('#about_sidebar_link').click()
    await expect(page).toHaveURL('https://saucelabs.com')
})

test('Verify that all items button redirects to products page', async ({ page }) => {
    
    await page.goto('/')
    await page.locator('#user-name').fill(USER_NAME)
    await page.locator('#password').fill(PASSWORD)
    await page.locator('#login-button').click()
    await page.locator('#shopping_cart_container').click()
    await page.locator('#react-burger-menu-btn').click()
    await page.locator('#inventory_sidebar_link').click()
    await expect(page.getByText('Products')).toBeVisible();
})

