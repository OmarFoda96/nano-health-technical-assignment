import { browser, by, element } from 'protractor';

describe('Product Management Dashboard', () => {
  beforeEach(() => {
    browser.get('/');
  });

  it('should display the application title', () => {
    expect(element(by.css('h1')).getText()).toContain('Product Management Dashboard');
  });

  it('should navigate to products page', () => {
    browser.get('/products');
    expect(browser.getCurrentUrl()).toContain('/products');
  });

  it('should display product cards', async () => {
    browser.get('/products');

    await browser.wait(() => {
      return element(by.css('app-product-card')).isPresent();
    }, 5000);

    const productCards = element.all(by.css('app-product-card'));
    expect(productCards.count()).toBeGreaterThan(0);
  });

  it('should navigate to product detail page', async () => {
    browser.get('/products');

    await browser.wait(() => {
      return element(by.css('app-product-card')).isPresent();
    }, 5000);

    const firstProductCard = element.all(by.css('app-product-card')).first();
    firstProductCard.click();

    await browser.wait(() => {
      return browser.getCurrentUrl().includes('/products/');
    }, 5000);

    expect(browser.getCurrentUrl()).toMatch(/\/products\/\d+/);
  });

  it('should switch language', () => {
    element(by.css('[matMenuTriggerFor="languageMenu"]')).click();

    element(by.cssContainingText('button', 'Spanish')).click();

    expect(element(by.cssContainingText('button', 'Spanish')).isPresent()).toBeTruthy();
  });

  it('should navigate to cart page', () => {
    element(by.css('.cart-button')).click();
    expect(browser.getCurrentUrl()).toContain('/cart');
  });

  it('should navigate to favorites page', () => {
    element(by.css('.favorites-button')).click();
    expect(browser.getCurrentUrl()).toContain('/favorites');
  });
});
