import { HmrPage } from './app.po';

describe('hmr App', () => {
  let page: HmrPage;

  beforeEach(() => {
    page = new HmrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
