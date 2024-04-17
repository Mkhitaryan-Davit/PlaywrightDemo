import { test, expect } from '@playwright/test';
const USER_NAME = process.env.USER_NAME
const PASSWORD = process.env.PASSWORD


if(USER_NAME === 'locked_out_user'){
    test('Ensure that the login is not possible with logged out user.', async({page}) => {

        const loginPage = new loginPage(page);
        await loginPage.goto();
        await expect(loginPage.getUsernameField()).toBeEmpty();
        await expect(loginPage.getPasswordField()).toBeEmpty();
        await expect(loginPage.getLoginButtonLocator()).toBeDisabled();
    })
}else {
    test('Verify the successful login to the webpage', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // Fill in the username and password fields
        await page.locator('#user-name').fill(USER_NAME);
        await page.locator('#password').fill(PASSWORD);
    
        // Click the login button
        await page.locator('#login-button').click();
    
        // Verify if the login was successful
        await expect(page.getByText('Products')).toBeVisible();
    });
    
    test('Verify the error message with invalid username', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // Fill in the username and password fields
        await page.fill('#user-name', 'invalidUserName');
        await page.fill('#password', PASSWORD);
    
        // Click the login button
        await page.locator('#login-button').click();
    
        // Verify was unsuccessfull
        await expect(page.locator('h3[data-test=error]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
    
    test('Verify the error message with invalid password', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // Fill in the username and password fields
        await page.fill('#user-name', USER_NAME);
        await page.fill('#password', 'wrongpassword');
    
        // Click the login button
        await page.locator('#login-button').click();
    
        // Verify was unsuccessfull
        await expect(page.locator('h3[data-test=error]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
    
    test('Verify the error message with invalid username and password', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // Fill in the username and password fields
        await page.fill('#user-name', 'wrongUsername');
        await page.fill('#password', 'wrongPassword');
    
        // Click the login button
        await page.locator('#login-button').click();
    
        // Verify was unsuccessfull
        await expect(page.locator('h3[data-test=error]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    });
    
    test('Verify the error message with empty username', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // Fill in the username and password fields
        await page.fill('#user-name', '');
        await page.fill('#password', PASSWORD);
    
        // Click the login button
        await page.locator('#login-button').click();
    
        // Verify was unsuccessfull
        await expect(page.locator('h3[data-test=error]')).toHaveText('Epic sadface: Username is required');
    });
    
    test('Verify the error message with empty password', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // Fill in the username and password fields
        await page.fill('#user-name', USER_NAME);
        await page.fill('#password', '');
    
        // Click the login button
        await page.locator('#login-button').click();
    
        // Verify was unsuccessfull
        await expect(page.locator('h3[data-test=error]')).toHaveText('Epic sadface: Password is required');
    });
    
    test(' Verify the error message with empty username and password', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // Fill in the username and password fields
        await page.fill('#user-name', '');
        await page.fill('#password', '');
    
        // Click the login button
        await page.locator('#login-button').click();
    
        // Verify was unsuccessfull
        await expect(page.locator('h3[data-test=error]')).toHaveText('Epic sadface: Username is required');
    });
    
    test(' Verify that login button is green', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // verify that login button is green
        await expect(page.locator('#login-button')).toHaveCSS('background-color', 'rgb(61, 220, 145)');
    });
    
    test(' Verify that errors are displayed with red color', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    
        // Click the login button
        await page.locator('#login-button').click();
    
        // verify that login button is green
        await expect(page.locator('.error-message-container')).toHaveCSS('background-color', 'rgb(226, 35, 26)');
    });
    
    test('verify that usernames and password list is displayed properly', async ({ page }) => {
        const userNames = ['standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user', 'error_user', 'visual_user'];
        const passwords = 'secret_sauce';
    
        // Navigate to the login page
        await page.goto('/');
    
        await expect(page.getByRole('heading', { name: 'Accepted usernames are:' })).toBeVisible();
        for(let i = 0; i < userNames.length; i += 1) {
            await expect(page.locator('#login_credentials')).toContainText(userNames[i]);
        }
        
        await expect(page.getByRole('heading',{name: 'Password for all users:'})).toBeVisible();
        await expect(page.locator('.login_password')).toContainText(passwords);
    
    });
    
    test('Verify that it is possible login with Enter Button', async ({ page }) => {
    
        // Navigate to the login page
        await page.goto('/');
    
        await page.fill('#user-name', USER_NAME);
        await page.fill('#password', PASSWORD);
        
        
        await page.keyboard.press('Enter');
        
    
        await expect(page.getByText('Products')).toBeVisible();
    
    });

    test('Verify that typed password characters are visible as asterisk symbols', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/');
    

        await page.locator('#password').fill(PASSWORD);
    
      
        await expect(page.locator('#password')).toHaveAttribute('type', 'password');
    });

    test('Verify characters limitation on username input field', async ({ page }) => {
       const usernameMaxLenght = '12345678910123456789101234567891012345678910'
        
       await page.goto('/');
       await page.locator('[data-test=username]').fill(usernameMaxLenght);
       await page.locator('#user-name').getAttribute('value').then((value) => {
        if(value.length>20){
            test.fail()
            console.log('Username is more than 20 characters')
            } 
        })
    })

    test('Verify characters limitation on password input field', async ({ page }) => {
        const passwordMaxLenght = '12345678910123456789101234567891012345678910'
         
        await page.goto('/');
        await page.locator('[data-test=password]').fill(passwordMaxLenght);
        await page.locator('#password').getAttribute('value').then((value) => {
         if(value.length>20){
             test.fail()
             console.log('Username is more than 20 characters')
             } 
         })
     })


     test('Ensure that the login button is unclickable when both the login and password fields are empty.', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await expect(loginPage.getUsernameField()).toBeEmpty();
        await expect(loginPage.getPasswordField()).toBeEmpty();
        await expect(loginPage.getLoginButtonLocator()).toBeDisabled();
     })

     test('Authorization with username case sensitivity', async ({ page }) => {
        await page.goto('/')
        await page.locator('[data-test=username]').fill(USER_NAME.toUpperCase())
        await page.locator('[data-test=password]').fill(PASSWORD)
        await page.locator('[data-test=login-button]').click()
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service') 
     })

     test('Authorization with password case sensitivity', async ({ page }) => {
        await page.goto('/')
        await page.locator('[data-test=username]').fill(USER_NAME)
        await page.locator('[data-test=password]').fill(PASSWORD.toUpperCase())
        await page.locator('[data-test=login-button]').click()
        await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service') 
     })


}

