const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.username = page.locator('#user-name');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login-button');

  }

  async goto() {
    await this.page.goto('/');
  }

  async fillUsernamefield(USERNAME) {
    await this.username.fill(USERNAME);
    await expect(this.username).toHaveAttribute('value',USERNAME);
  }

  async fillPasswordfield(PASSWORD) {
    await this.password.fill(PASSWORD);
    await expect(this.password).toHaveAttribute('value',PASSWORD);
  }
  
  async clickLoginButton() {
    await this.loginButton.click()
  }
  
  getErrorField(){
    return this.getErrorField
  }

  getUsernameField(){
    return this.username
  }

  getPasswordField(){
    return this.password
  }



};

