import { Image } from './image.js'
import { TestUtils } from '../test/test-utils.js';
import imgTest from '../test/img/testImage.svg'

describe('Testing web component <olist-image>', () => {

  it('displays olist-image default', async () => {
    const { shadowRoot } = await TestUtils.render(Image.tag);
    expect(shadowRoot.innerHTML.includes('imgDefault')).toBeTruthy();
  });

  it('displays olist-image with parameters', async () => {
      const { shadowRoot } = await TestUtils.render(
        Image.tag, { id: 'idImageTest', src: imgTest }
      );
      const value = shadowRoot.innerHTML.includes('idImageTest');
      expect(value).toBeTruthy();
  });

});
