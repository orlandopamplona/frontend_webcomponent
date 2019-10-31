/**
* @description Class used to support testing (component mount)
* Reference from project: https://github.com/pietmichal/how-to-test-web-component
*/
export class TestUtils {

  /**
   * @param {string} tag
   * @param {object} attributes
   * @returns {Promise<HTMLElement>}
   * @description Renders a given element with provided attributes
   * and returns a promise which resolves as soon as
   * rendered element becomes available.
   */
  static render(tag, attributes = {}) {
    TestUtils._renderToDocument(tag, attributes);
    return TestUtils._waitForComponentToRender(tag);
  }

  /**
   * @param {string} tag
   * @param {object} attributes
   * @description Replaces document's body with provided element
   * including given attributes.
   */
  static _renderToDocument(tag, attributes) {
    const htmlAttributes = TestUtils._mapObjectToHTMLAttributes(attributes);
    document.body.innerHTML = `<${tag} ${htmlAttributes}></${tag}>`;
  }

  /**
   * @param {object} attributes
   * @returns {string}
   * @description Converts an object to HTML string representation of attributes.
   * For example: `{ foo: 'bar', baz: 'foo' }`
   * becomes `foo='bar' baz='foo'`
   */
  static _mapObjectToHTMLAttributes(attributes) {
    return Object.entries(attributes).reduce((previous, current) => {
      return previous + ` ${current[0]}='${current[1]}'`;
    }, '');
  }

  /**
   * @param {string} tag
   * @returns {Promise<HTMLElement>}
   * @description Returns a promise which resolves as soon as
   * requested element becomes available.
   */
  static async _waitForComponentToRender(tag) {
    return new Promise(resolve => {
      function requestComponent() {
        const element = document.querySelector(tag);
        if (element) {
          resolve(element);
        } else {
          window.requestAnimationFrame(requestComponent);
        }
      }
      requestComponent();
    });
  }
}