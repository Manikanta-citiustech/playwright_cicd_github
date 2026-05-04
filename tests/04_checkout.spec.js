
// tests/checkout.spec.js
import { test, expect } from '@playwright/test';
import { CartPage } from '../pages/CartPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { Header } from '../pages/Header.js';
//import { customer } from '../data/testData.js';
import { loadCart, saveCart } from '../utils/cartState.js';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../data/testData.js';
import { fakeUser } from '../utils/fakerData.js';
import {logStep} from '../utils/logger.js';

// Loads existing cart, fills checkout information, lands on overview, saves state

test.beforeEach(async ({ page }) => {
  await loadCart(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Checkout: fill your info and land on overview',{tag:["@smoke"]}, async ({ page }) => {
  await new LoginPage(page).login(users.valid.username, users.valid.password);
  
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const header = new Header(page);

  await inventory.open();
  await inventory.goToCart();
  await cart.checkout();

  //await checkout.fillYourInfo(customer.firstName, customer.lastName, customer.zip);
  await checkout.fillYourInfo(fakeUser);
  logStep('firstname: '+fakeUser.firstName);
  logStep('lastname: '+fakeUser.lastName);
  logStep('Zipcode: '+fakeUser.zipCode);

  await expect(page).toHaveURL(/checkout-step-two\.html/);

  // Items count equals cart badge
  const rows = await page.locator('.cart_item').count();
  const expected = await header.cartCount();
  expect(rows).toBe(expected);

  await saveCart(page);
});
