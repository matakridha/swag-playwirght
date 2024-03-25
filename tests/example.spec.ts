import { expect, test } from '@playwright/test';
import { LoginPage } from '../pages/home-page';

test('Login test success', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await page.goto('https://the-internet.herokuapp.com/login');

    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');
});

test('Login test failed', async ({ page}) => {
  const loginPage = new LoginPage(page);

  await page.goto('https://the-internet.herokuapp.com/login');

  await loginPage.login('notUsername', 'notPassword');

  await page.waitForSelector('div#flash.error');

  const errorMessageElement = await page.$('div#flash.error');

  expect(errorMessageElement).not.toBeNull();

  // If the error message element exists, check its text
  if (errorMessageElement) {
    const errorMessageText = await errorMessageElement.innerText();
    expect(errorMessageText).toContain('Your username is invalid!');
  }
})
