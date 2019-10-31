import { Text } from './text.js'
import { TestUtils } from '../test/test-utils.js';

describe('Testing web component <olist-text>', () => {
  it('displays olist-text default', async () => {
    const { shadowRoot } = await TestUtils.render(Text.tag);
    expect(shadowRoot.innerHTML.includes('DefaultContent')).toBeTruthy();
  });

  it('displays olist-text with parameters', async () => {
      const { shadowRoot } = await TestUtils.render(
        Text.tag, { id: 'idTextTest' }
      );
      const value = shadowRoot.innerHTML.includes('idTextTest');
      expect(value).toBeTruthy();
  });

});
