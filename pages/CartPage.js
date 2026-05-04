
// pages/CartPage.js
export class CartPage {
  constructor(page) {
    this.page = page;
    this.rowTitle = '.cart_item .inventory_item_name';
    this.continueBtn = '#continue-shopping';
    this.checkoutBtn = '#checkout';
  }
  async expectTitles(names) {
    for (const n of names) {
      await this.page.locator(this.rowTitle, { hasText: n }).first().waitFor();
    }
  }
  async continueShopping() { await this.page.click(this.continueBtn); }
  async checkout() { await this.page.click(this.checkoutBtn); }
}
