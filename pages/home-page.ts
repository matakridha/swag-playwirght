import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly addToCartButton2: Locator;
    readonly cartItemDiv: Locator;
    readonly cartLink: Locator;
    readonly cartBadgeSpan: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadgeSpan = page.locator('.shopping_cart_badge');
        this.addToCartButton = page.locator('button[data-test="add-to-cart-sauce-labs-backpack"]');
        this.addToCartButton2 = page.locator('button[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.cartLink = page.locator('a.shopping_cart_link > span.shopping_cart_badge');
        this.cartItemDiv = page.locator('.cart_item');
    }

    async addToCart() {
        await this.addToCartButton.click();
        await this.cartBadgeSpan.isVisible();
        await this.cartLink.click();
        await this.cartItemDiv.isVisible();
    }
    async addsToCart() {
        await this.addToCartButton.click();
        await this.addToCartButton2.click();
        await this.cartBadgeSpan.isVisible();
        await this.cartLink.click();
    }
}