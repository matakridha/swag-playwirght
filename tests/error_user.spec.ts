import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';
import { CartPage } from '../pages/cart-page';

const URL = 'https://www.saucedemo.com';
const cartURL = 'https://www.saucedemo.com/cart.html';
const plpURL = 'https://www.saucedemo.com/inventory.html';
const checkoutURL = 'https://www.saucedemo.com/checkout-complete.html';

test.describe.only('error_user - Checkout With',() =>{
    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
    
        await page.goto(URL);
        await loginPage.login('error_user','secret_sauce');
    })

    test('User Login, add to cart', async ({ page }) => {
        const homePage = new HomePage(page);
        await expect(page).toHaveURL(plpURL);
    })

    test('Cart CURD Testing single Item', async ({page}) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        await page.goto(plpURL);
        await expect(page).toHaveURL(plpURL);
        await homePage.addToCart();
        await expect(page).toHaveURL(cartURL);
        await cartPage.removeItem();

        //checkout
        await page.goto(plpURL);
        await expect(page).toHaveURL(plpURL);
        await homePage.addToCart();
        await cartPage.checkoutItems('Rio','Kridha','20009');
        await cartPage.verifyTotalPrice();
        await expect(page).toHaveURL(checkoutURL);

    }) 

    test('Cart CURD Testing multi Item', async ({page}) => {
        const homePage = new HomePage(page);
        const cartPage = new CartPage(page);

        await page.goto(plpURL);
        await expect(page).toHaveURL(plpURL);
        await homePage.addsToCart();
        await expect(page).toHaveURL(cartURL);
        await cartPage.verifyItems();
        await cartPage.removeItems();
        await expect(page).toHaveURL(cartURL);

        //checkout
        await page.goto(plpURL);
        await expect(page).toHaveURL(plpURL);
        await homePage.addsToCart();
        await cartPage.checkoutItems('Rio','Kridha','20009');
        await cartPage.verifyTotalPrice();
        await expect(page).toHaveURL(checkoutURL);
    }) 

})