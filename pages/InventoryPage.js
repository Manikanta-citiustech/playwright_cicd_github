
// pages/InventoryPage.js
export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.item = '.inventory_item';
    this.itemName = '.inventory_item_name';
    this.cartLink = '.shopping_cart_link';
    this.badge = '.shopping_cart_badge';
  }

  async open() { await this.page.goto('/inventory.html'); }

  async addToCartByName(name) {
    const card = this.page.locator(this.item)
      .filter({ has: this.page.locator(this.itemName, { hasText: new RegExp(name, 'i') }) });
    await card.first().waitFor();

    const removeBtn = card.getByRole('button', { name: 'Remove' });
    if (await removeBtn.isVisible().catch(() => false)) {
      // already added → no-op
      return;
    }
    await card.getByRole('button', { name: 'Add to cart' }).click();
  }

  async goToCart() { await this.page.click(this.cartLink); }

  async getCartCount() {
    const badge = this.page.locator(this.badge);
    if (!(await badge.isVisible().catch(() => false))) return 0;
    return Number(await badge.textContent());
  }
}
