import { Button } from './button.js'
import { TestUtils } from '../test/test-utils.js';

describe('Testing web component <olist-button>', () => {
  it('displays olist-button default', async () => {
    const { shadowRoot } = await TestUtils.render(Button.tag);
    expect(shadowRoot.innerHTML.includes('DefaultContent')).toBeTruthy();
  });

  it('displays olist-button with parameters', async () => {
      const { shadowRoot } = await TestUtils.render(
        Button.tag, { id: 'idButtonTest' }
      );
      const value = shadowRoot.innerHTML.includes('idButtonTest');
      expect(value).toBeTruthy();
  });

  it('displays olist-button loading', async () => {
      const { shadowRoot } = await TestUtils.render(
        Button.tag, { content: 'loadingDots_2' }
      );
      const value = shadowRoot.innerHTML.includes('dotSmall');
      expect(value).toBeTruthy();
  });


});
