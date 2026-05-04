
// tests/addToCart.spec.js
import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage.js';
import { products } from '../data/testData.js';
import { clearCart, saveCart, loadCart } from '../utils/cartState.js';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../data/testData.js';


test.describe('Add to Cart flow with persisted cart state', () => {

// Adds first two products and persists cart to cart-state.json
// Depends on: 01_login (authenticated session via auth.json)

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(users.valid.username, users.valid.password);
  await loadCart(page); // load any previous (will be empty on first run)
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Add first two items and save cart',{tag:["@smoke"]}, async ({ page }) => {
//await new LoginPage(page).login(users.valid.username, users.valid.password);
 
  const inventory = new InventoryPage(page);
  await inventory.open();

  // Ensure clean cart for deterministic count
  await clearCart(page);

  for (const name of products.firstTwo) {
    await inventory.addToCartByName(name);
  }
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  // Persist cart to disk for the next test
  await saveCart(page);
});
});