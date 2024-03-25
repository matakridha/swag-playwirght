import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly loginButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly errorMsg: Locator;

    constructor(page: Page){
        this.page = page;
        this.usernameInput = page.locator('input[data-test="username"]');
        this.passwordInput = page.locator('input[data-test="password"]');
        this.loginButton = page.locator('input[data-test="login-button"]');
        this.errorMsg = page.locator('h3[data-test="error"]');

    }

    async login(username: string, password: string){
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        const isLoginFail = await this.page.waitForSelector('h3[data-test="error"]', { timeout: 5000 }).then(() => true).catch(() => false);

        if (isLoginFail){
            await this.errorMsg.isVisible();
        } else {
            console.log('Login Success');
        }
    }

} 