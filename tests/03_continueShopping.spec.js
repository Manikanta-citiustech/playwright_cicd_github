
// tests/continueShopping.spec.js
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { Header } from '../pages/Header.js';
import { products } from '../data/testData.js';
import { loadCart, saveCart } from '../utils/cartState.js';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../data/testData.js';

// Loads cart from previous test, continues shopping, adds one item, saves cart


test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(users.valid.username, users.valid.password);
  await loadCart(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Continue shopping and add one more item (persist cart)', async ({ page }) => { 
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const header = new Header(page);

  await inventory.open();
  await inventory.goToCart();
  await expect(page).toHaveURL(/cart\.html/);

  const before = await header.cartCount();

  await cart.continueShopping();
  await expect(page).toHaveURL(/inventory\.html/);

  await inventory.addToCartByName(products.extraOne);
  await expect(page.locator('.shopping_cart_badge')).toHaveText(String(before + 1));

  await saveCart(page);
});
