import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';

const URL = 'https://www.saucedemo.com';

test.beforeEach(async ({page}) => {
    await page.goto(URL);
})

test.describe('Negative - Login with Locked User',() =>{
    test('User Login, add to cart', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const homePage = new HomePage(page);
        
        await loginPage.login('locked_out_user','secret_sauce');
    })
})

/*
test.describe('Negative - Login with Problem User',() =>{

    test.beforeEach(async({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('problem_user','secret_sauce');
    })

    test('User Login, add to cart', async ({ page }) => {
        const homePage = new HomePage(page);
        
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        await homePage.addToCart();

    })

    test('User Login, add to crt', async ({ page }) => {
        const homePage = new HomePage(page);

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    })
}) */