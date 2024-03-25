import { Page, Locator, expect } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly removeButton1:Locator;
    readonly removeButton2:Locator;
    readonly checkoutButton:Locator;
    readonly continueButton:Locator;
    readonly finishButton:Locator;
    readonly cartItemDiv:Locator;
    readonly cartItemDiv1:Locator;
    readonly cartItemDiv2:Locator;
    readonly continueShoppingButton:Locator;
    readonly inputFirstName: Locator;
    readonly inputLastName: Locator;
    readonly inputZip: Locator;
    readonly itemTotalElement: Locator;
    readonly taxElement: Locator;
    readonly totalElement: Locator;

    constructor(page: Page){

        this.removeButton1 = page.locator('button[data-test="remove-sauce-labs-backpack"]');
        this.removeButton2 = page.locator('button[data-test="remove-sauce-labs-bike-light"]');

        this.checkoutButton = page.locator('button[data-test="checkout"]');
        this.continueButton = page.locator('input[data-test="continue"]');
        this.finishButton = page.locator('button[data-test="finish"]');

        this.cartItemDiv = page.locator('.cart_item'); 
        this.continueShoppingButton = page.locator('button[data-test="continue-shopping"]');

        this.inputFirstName = page.locator('input[data-test="firstName"][placeholder="First Name"]');
        this.inputLastName = page.locator('input[data-test="lastName"][placeholder="Last Name"]');
        this.inputZip = page.locator('input[data-test="postalCode"][placeholder="Zip/Postal Code"]');

        this.cartItemDiv1 = page.locator('.cart_item:nth-child(1)');
        this.cartItemDiv2 = page.locator('.cart_item:nth-child(2)');
       // const priceDiv = page.locator('.inventory_item_price:has-text("$29.99")');

       //total price
       this.itemTotalElement = page.locator('div.summary_subtotal_label');
       this.taxElement = page.locator('div.summary_tax_label');
       this.totalElement = page.locator('div.summary_total_label');
    }

    async removeItem(){
        await this.removeButton1.isVisible();
        await this.removeButton1.click();
        await this.removeButton1.isHidden();
    }
    async removeItems(){
        await this.removeButton1.isVisible();
        await this.removeButton1.click();
        await this.removeButton1.isHidden();
        await this.removeButton2.isVisible();
        await this.removeButton2.click();
        await this.removeButton2.isHidden();
    }

    async verifyItems(){
        await this.cartItemDiv1.isVisible();
        await this.cartItemDiv2.isVisible();
    }

    async checkoutItems(firstName,lastName,zip){
        await this.checkoutButton.click();
        await this.inputFirstName.isVisible();
        await this.inputFirstName.type(firstName);
        await this.inputLastName.type(lastName);
        await this.inputZip.type(zip);

        const fn = await this.inputFirstName.inputValue(firstName);
        const ln = await this.inputLastName.inputValue(lastName);
        const zc = await this.inputZip.inputValue(zip);

        expect(fn).toBe(firstName);
        expect(ln).toBe(lastName);
        expect(zc).toBe(zip);

        await this.continueButton.click();
    }

    async verifyTotalPrice(){
        const itemTotalText = await this.itemTotalElement.innerText();
        const taxText = await this.taxElement.innerText();
        const totalText = await this.totalElement.innerText();

        const itemTotal = parseFloat(itemTotalText.replace('Item total: $',''))
        const tax = parseFloat(taxText.replace('Tax: $',''))
        const total = parseFloat(totalText.replace('Total: $',''))

        const expectedTotal = itemTotal + tax;

        if (total == expectedTotal) await this.finishButton.click();
        else throw Error('Total value incorrect');
    }
}