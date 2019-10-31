import { Indicator } from './indicator.js'
import { TestUtils } from '../test/test-utils.js';

describe('Testing web component <olist-indicator>', () => {
  it('displays olist-indicator default', async () => {
    const { shadowRoot } = await TestUtils.render(Indicator.tag);
    expect(shadowRoot.innerHTML.includes('indicatorDefault')).toBeTruthy();
  });

  it('displays olist-indicatore with parameters', async () => {
      const { shadowRoot } = await TestUtils.render(
        Indicator.tag, { id: 'idIndicatorTest' }
      );
      const value = shadowRoot.innerHTML.includes('idIndicatorTest');
      expect(value).toBeTruthy();
  });

});
