import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../data/testData.js';


test.describe('Login Flow - SauceDemo', () => {

test('Login with invalid credentials', async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(users.invalid.username, users.invalid.password);
  await expect(page.locator('[data-test="error"]')).toBeVisible();
});

test('Login with valid credentials',{tag:["@smoke"]}, async ({ page }) => {
  const login = new LoginPage(page);
  await login.login(users.valid.username, users.valid.password);
  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText('Swag Labs')).toBeVisible();

});
});

  

  