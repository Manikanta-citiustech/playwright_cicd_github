import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { Header } from '../pages/Header.js';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../data/testData.js';
import { loadCart, saveCart } from '../utils/cartState.js';
import { logStep } from '../utils/logger.js';
import { readCSV } from '../utils/csvReader.js';

// READ CSV DATA
const checkoutData = readCSV('checkoutData.csv');

test.beforeEach(async ({ page }) => {
  await loadCart(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test.describe('Checkout Flow – CSV Based', () => {

  checkoutData.forEach((data, index) => {

    test(`Checkout: fill info using CSV row ${index + 1} @smoke`, async ({ page }) => {

      await new LoginPage(page).login(
        users.valid.username,
        users.valid.password
      );

      const inventory = new InventoryPage(page);
      const cart = new CartPage(page);
      const checkout = new CheckoutPage(page);
      const header = new Header(page);

      await inventory.open();
      await inventory.goToCart();
      await cart.checkout();

      await checkout.fillYourInfo({
        firstName: data.firstName,
        lastName: data.lastName,
        zipCode: data.zipCode,
      });

      logStep(`FirstName: ${data.firstName}`);
      logStep(`LastName: ${data.lastName}`);
      logStep(`ZipCode: ${data.zipCode}`);

      await expect(page).toHaveURL(/checkout-step-two\.html/);

      const rows = await page.locator('.cart_item').count();
      const expected = await header.cartCount();
      expect(rows).toBe(expected);

      await saveCart(page);
    });

  });

});