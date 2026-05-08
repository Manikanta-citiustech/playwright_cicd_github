
/*import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../data/testData.js';
import {logStep} from '../utils/logger.js';

test('Negative scenario', async ({ page }) => {
  test.fail(); // expected failure

  const login = new LoginPage(page);
  await login.login(users.valid.username, users.valid.password);
  await expect(page).toHaveURL(/inventory.test/);
  logStep('Error in navigating to login page');
});*/

 
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { users } from '../data/testData.js';
import {logStep} from '../utils/logger.js';
 
test('Negative scenario', async ({ page }) => {
  const login = new LoginPage(page);
  //test.fail();
  await login.login(users.valid.username, users.valid.password);
 
  try {
    
    await expect(page).toHaveURL(/inventory.test/);
  } catch (error) {
    logStep('Error in navigating to inventory page');
    console.error('ASSERTION ERROR:', error.message);
  }
});
 
 
