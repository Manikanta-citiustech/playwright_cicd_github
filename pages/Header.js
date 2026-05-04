
// pages/Header.js
export class Header {
  constructor(page) {
    this.page = page;
    this.menuBtn = '#react-burger-menu-btn';
    this.logoutLink = '#logout_sidebar_link';
    this.cartBadge = '.shopping_cart_badge';
  }
  async cartCount() {
    const badge = this.page.locator(this.cartBadge);
    if (!(await badge.isVisible().catch(() => false))) return 0;
    return Number(await badge.textContent());
  }
  async logout() {
    await this.page.click(this.menuBtn);
    await this.page.click(this.logoutLink);
  }
}
