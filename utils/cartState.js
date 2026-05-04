
// utils/cartState.js
import fs from 'fs';

const STATE_FILE = 'cart-state.json';

export async function saveCart(page, file = STATE_FILE) {
  // SauceDemo stores the cart in localStorage under 'cart-contents' (array of product IDs)
  const data = await page.evaluate(() => localStorage.getItem('cart-contents'));
  fs.writeFileSync(file, data ?? '[]', 'utf-8');
}

export async function loadCart(page, file = STATE_FILE) {
  const json = fs.existsSync(file) ? fs.readFileSync(file, 'utf-8') : '[]';
  // Must be on same origin to access localStorage
  await page.goto('/inventory.html');
  await page.evaluate((payload) => localStorage.setItem('cart-contents', payload), json);
  await page.reload();
}

export async function clearCart(page) {
  await page.goto('/inventory.html');
  await page.evaluate(() => localStorage.removeItem('cart-contents'));
  await page.reload();
}
