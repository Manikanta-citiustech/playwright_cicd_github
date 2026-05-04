
// tests/finish_and_logout.spec.js
import { test, expect } from '@playwright/test';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { Header } from '../pages/Header.js';
import { loadCart } from '../utils/cartState.js';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../data/testData.js';

// Finishes the order and logs out

test.beforeEach(async ({ page }) => {
  await new LoginPage(page).login(users.valid.username, users.valid.password);
  await loadCart(page);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test('Finish order and logout',{tag:["@smoke"]}, async ({ page }) => {
  
  const checkout = new CheckoutPage(page);
  const header = new Header(page);

  // Assumes we are on overview page or loads site to same origin first
  await page.goto('/checkout-step-two.html');
  // If direct navigation fails (no state), fallback to inventory then cart then overview
  if (!/checkout-step-two\.html/.test(page.url())) {
    await page.goto('/inventory.html');
  }

  await checkout.finish();
  await expect(page.locator('.complete-header')).toHaveText(/Thank you for your order!/i);

  await header.logout();
  await expect(page).toHaveURL(/index\.html|\/$/);
});
