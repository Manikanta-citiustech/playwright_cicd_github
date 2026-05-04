// pages/CheckoutPage.js
export class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = '#first-name';
    this.lastName = '#last-name';
    this.postalCode = '#postal-code';
    this.continueBtn = '#continue';
    this.finishBtn = '#finish';
  }
  async fillYourInfo({ firstName, lastName, zipCode }) {
    await this.page.fill(this.firstName, firstName);
    await this.page.fill(this.lastName, lastName);
    await this.page.fill(this.postalCode, zipCode);
    await this.page.click(this.continueBtn);

  }
  async finish() { await this.page.click(this.finishBtn); }
}
