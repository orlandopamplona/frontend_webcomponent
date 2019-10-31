import { Register } from './index.js'
import { TestUtils } from './components/test/test-utils.js';


describe('Testing web component <olist-register>', () => {

  // Testing main component begin
  it('displays olist-register default', async () => {
    const { shadowRoot } = await TestUtils.render(Register.tag);
    expect(shadowRoot.innerHTML.includes('defaultRegister')).toBeTruthy();
  });

  it('displays olist-register with parameters', async () => {
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'idRegisterTest' }
      );
      const mainDiv = shadowRoot.innerHTML.includes('idRegisterTest');
      expect(mainDiv).toBeTruthy();
  });

  it('displays olist-register account created confirm', async () => {
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'idRegisterTest', accountcreated: true }
      );
      const textConfirm = shadowRoot.innerHTML.includes('lblConfirmTitle');
      expect(textConfirm).toBeTruthy();
  });
  // Testing main component end


  // Testing input default begin
  it('test border input default', async () => {
      const validBorder = 'border: 1px solid #17D499;'
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const input = shadowRoot.getElementById('inputNameText');
      expect(input.innerHTML.includes(invalidBorder)).toBeFalsy();
      expect(input.innerHTML.includes(validBorder)).toBeFalsy();
  });

  it('test border input valid', async () => {
      const validBorder = 'border: 1px solid #17D499;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const input = shadowRoot.getElementById('inputNameText');
      const evtValid = new CustomEvent('changeinput', {
        detail: {
                  inputvalues           : 'x',
                  focuselement          : 'inputNameText',
                  notEmptyBorderColor   : input.validateInput('x', 'empty')
                },
                bubbles: true
      })
      input.dispatchEvent(evtValid);
      expect(input.styleinput.includes(validBorder)).toBeTruthy();
  });

  it('test border input invalid', async () => {
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const input = shadowRoot.getElementById('inputNameText');
      const evtInvalid = new CustomEvent('changeinput', {
        detail: {
                  inputvalues           : '',
                  focuselement          : 'inputNameText',
                  notEmptyBorderColor   : input.validateInput('', 'empty')
                },
                bubbles: true
      })
      input.dispatchEvent(evtInvalid);
      expect(input.styleinput.includes(invalidBorder)).toBeTruthy();
  });
  // Testing input default end

  // Testing input mail begin
  it('test border mail input default', async () => {
      const validBorder = 'border: 1px solid #17D499;'
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputMail = shadowRoot.getElementById('inputEmailText');
      expect(inputMail.innerHTML.includes(invalidBorder)).toBeFalsy();
      expect(inputMail.innerHTML.includes(validBorder)).toBeFalsy();
  });

  it('test border mail input valid', async () => {
      const validBorder = 'border: 1px solid #17D499;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputMail = shadowRoot.getElementById('inputEmailText');
      const evtValid = new CustomEvent('changeinput', {
        detail: {
                  inputvalues           : '',
                  focuselement          : 'inputEmailText',
                  notEmptyBorderColor   : inputMail.validateInput('', 'empty'),
                  isValidMailBorderColor: inputMail.validateInput('mail@valid.com', 'mail')
                },
                bubbles: true
      })
      inputMail.dispatchEvent(evtValid);
      expect(inputMail.styleinput.includes(validBorder)).toBeTruthy();
  });

  it('test border mail input invalid', async () => {
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputMail = shadowRoot.getElementById('inputEmailText');
      const evtInvalid = new CustomEvent('changeinput', {
        detail: {
                  inputvalues           : 'mail_format_invalid',
                  focuselement          : 'inputEmailText',
                  notEmptyBorderColor   : inputMail.validateInput('', 'empty'),
                  isValidMailBorderColor: inputMail.validateInput('mail_format_invalid', 'mail')
                },
                bubbles: true
      })
      inputMail.dispatchEvent(evtInvalid);
      expect(inputMail.styleinput.includes(invalidBorder)).toBeTruthy();
  });
  // Testing input mail end


  // Testing input password begin
  it('test border password input default', async () => {
      const validBorder = 'border: 1px solid #17D499;'
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputPassword = shadowRoot.getElementById('inputPasswordText');
      expect(inputPassword.innerHTML.includes(invalidBorder)).toBeFalsy();
      expect(inputPassword.innerHTML.includes(validBorder)).toBeFalsy();
  });

  it('test border password input valid', async () => {
      const validBorder = 'border: 1px solid #17D499;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputPassword = shadowRoot.getElementById('inputPasswordText');
      const evtValid = new CustomEvent('changeinput', {
        detail: {
                  colors      : inputPassword.validatePassword('Senha1234'),
                  inputvalues : 'Senha1234',
                  focuselement: 'inputPasswordText'
                },
                bubbles: true
      })
      inputPassword.dispatchEvent(evtValid);
      expect(inputPassword.styleinput.includes(validBorder)).toBeTruthy();
  });

  it('test password input valid only rule at least 6 characters', async () => {
      const defaultColor = '#EAEAF4'
      const invalidColor = '#F79682'
      const validColor = '#1FE6A8'
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputPassword = shadowRoot.getElementById('inputPasswordText');
      const evtInvalid = new CustomEvent('changeinput', {
        detail: {
                  colors      : inputPassword.validatePassword('senhax'),
                  inputvalues : 'senhax',
                  focuselement: 'inputPasswordText'
                },
                bubbles: true
      })
      inputPassword.dispatchEvent(evtInvalid);
      expect(inputPassword.styleinput.includes(invalidBorder)).toBeTruthy();

      const indicatorOne = shadowRoot.getElementById('divIndicatorOne');
      expect(indicatorOne.stylediv.includes(invalidColor)).toBeTruthy();

      const indicatorTwo = shadowRoot.getElementById('divIndicatorTwo');
      expect(indicatorTwo.stylediv.includes(defaultColor)).toBeTruthy();

      const indicatorThree = shadowRoot.getElementById('divIndicatorThree');
      expect(indicatorThree.stylediv.includes(defaultColor)).toBeTruthy();

      const ruleOne = shadowRoot.getElementById('ruleOne');
      expect(ruleOne.stylediv.includes(validColor)).toBeTruthy();

      const ruleTwo = shadowRoot.getElementById('ruleTwo');
      expect(ruleTwo.stylediv.includes(invalidColor)).toBeTruthy();

      const ruleThree = shadowRoot.getElementById('ruleThree');
      expect(ruleThree.stylediv.includes(invalidColor)).toBeTruthy();

  });

  it('test password input valid only rule at least 1 uppercase letter', async () => {
      const defaultColor = '#EAEAF4'
      const invalidColor = '#F79682'
      const validColor = '#1FE6A8'
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputPassword = shadowRoot.getElementById('inputPasswordText');
      const evtInvalid = new CustomEvent('changeinput', {
        detail: {
                  colors      : inputPassword.validatePassword('S'),
                  inputvalues : 'S',
                  focuselement: 'inputPasswordText'
                },
                bubbles: true
      })
      inputPassword.dispatchEvent(evtInvalid);
      expect(inputPassword.styleinput.includes(invalidBorder)).toBeTruthy();

      const indicatorOne = shadowRoot.getElementById('divIndicatorOne');
      expect(indicatorOne.stylediv.includes(invalidColor)).toBeTruthy();

      const indicatorTwo = shadowRoot.getElementById('divIndicatorTwo');
      expect(indicatorTwo.stylediv.includes(defaultColor)).toBeTruthy();

      const indicatorThree = shadowRoot.getElementById('divIndicatorThree');
      expect(indicatorThree.stylediv.includes(defaultColor)).toBeTruthy();

      const ruleOne = shadowRoot.getElementById('ruleOne');
      expect(ruleOne.stylediv.includes(invalidColor)).toBeTruthy();

      const ruleTwo = shadowRoot.getElementById('ruleTwo');
      expect(ruleTwo.stylediv.includes(validColor)).toBeTruthy();

      const ruleThree = shadowRoot.getElementById('ruleThree');
      expect(ruleThree.stylediv.includes(invalidColor)).toBeTruthy();

  });

  it('test password input valid only rule at least 1 number', async () => {
      const defaultColor = '#EAEAF4'
      const invalidColor = '#F79682'
      const validColor = '#1FE6A8'
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputPassword = shadowRoot.getElementById('inputPasswordText');
      const evtInvalid = new CustomEvent('changeinput', {
        detail: {
                  colors      : inputPassword.validatePassword('1'),
                  inputvalues : '1',
                  focuselement: 'inputPasswordText'
                },
                bubbles: true
      })
      inputPassword.dispatchEvent(evtInvalid);
      expect(inputPassword.styleinput.includes(invalidBorder)).toBeTruthy();

      const indicatorOne = shadowRoot.getElementById('divIndicatorOne');
      expect(indicatorOne.stylediv.includes(invalidColor)).toBeTruthy();

      const indicatorTwo = shadowRoot.getElementById('divIndicatorTwo');
      expect(indicatorTwo.stylediv.includes(defaultColor)).toBeTruthy();

      const indicatorThree = shadowRoot.getElementById('divIndicatorThree');
      expect(indicatorThree.stylediv.includes(defaultColor)).toBeTruthy();

      const ruleOne = shadowRoot.getElementById('ruleOne');
      expect(ruleOne.stylediv.includes(invalidColor)).toBeTruthy();

      const ruleTwo = shadowRoot.getElementById('ruleTwo');
      expect(ruleTwo.stylediv.includes(invalidColor)).toBeTruthy();

      const ruleThree = shadowRoot.getElementById('ruleThree');
      expect(ruleThree.stylediv.includes(validColor)).toBeTruthy();

  });

  it('test password input valid all rules satisfied', async () => {
      const defaultColor = '#EAEAF4'
      const invalidColor = '#F79682'
      const validColor = '#1FE6A8'
      const validBorder = 'border: 1px solid #17D499;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputPassword = shadowRoot.getElementById('inputPasswordText');
      const evtInvalid = new CustomEvent('changeinput', {
        detail: {
                  colors      : inputPassword.validatePassword('Senha123'),
                  inputvalues : 'Senha123',
                  focuselement: 'inputPasswordText'
                },
                bubbles: true
      })
      inputPassword.dispatchEvent(evtInvalid);
      expect(inputPassword.styleinput.includes(validBorder)).toBeTruthy();

      const indicatorOne = shadowRoot.getElementById('divIndicatorOne');
      expect(indicatorOne.stylediv.includes(validColor)).toBeTruthy();

      const indicatorTwo = shadowRoot.getElementById('divIndicatorTwo');
      expect(indicatorTwo.stylediv.includes(validColor)).toBeTruthy();

      const indicatorThree = shadowRoot.getElementById('divIndicatorThree');
      expect(indicatorThree.stylediv.includes(validColor)).toBeTruthy();

      const ruleOne = shadowRoot.getElementById('ruleOne');
      expect(ruleOne.stylediv.includes(validColor)).toBeTruthy();

      const ruleTwo = shadowRoot.getElementById('ruleTwo');
      expect(ruleTwo.stylediv.includes(validColor)).toBeTruthy();

      const ruleThree = shadowRoot.getElementById('ruleThree');
      expect(ruleThree.stylediv.includes(validColor)).toBeTruthy();

  });

  it('test password input valid partial rules satisfied', async () => {
      const defaultColor = '#EAEAF4'
      const partialValidColor = '#F7BC1C'
      const invalidColor = '#F79682'
      const validColor = '#1FE6A8'
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const inputPassword = shadowRoot.getElementById('inputPasswordText');
      const evtInvalid = new CustomEvent('changeinput', {
        detail: {
                  colors      : inputPassword.validatePassword('Senhax'),
                  inputvalues : 'Senhax',
                  focuselement: 'inputPasswordText'
                },
                bubbles: true
      })
      inputPassword.dispatchEvent(evtInvalid);
      expect(inputPassword.styleinput.includes(invalidBorder)).toBeTruthy();

      const indicatorOne = shadowRoot.getElementById('divIndicatorOne');
      expect(indicatorOne.stylediv.includes(partialValidColor)).toBeTruthy();

      const indicatorTwo = shadowRoot.getElementById('divIndicatorTwo');
      expect(indicatorTwo.stylediv.includes(partialValidColor)).toBeTruthy();

      const indicatorThree = shadowRoot.getElementById('divIndicatorThree');
      expect(indicatorThree.stylediv.includes(defaultColor)).toBeTruthy();

      const ruleOne = shadowRoot.getElementById('ruleOne');
      expect(ruleOne.stylediv.includes(validColor)).toBeTruthy();

      const ruleTwo = shadowRoot.getElementById('ruleTwo');
      expect(ruleTwo.stylediv.includes(validColor)).toBeTruthy();

      const ruleThree = shadowRoot.getElementById('ruleThree');
      expect(ruleThree.stylediv.includes(invalidColor)).toBeTruthy();

  });
  // Testing input password end

  // Testing button createAccount begin
  it('test button create account disabled', async () => {
      const validBorder = 'border: 1px solid #17D499;'
      const invalidBorder = 'border: 1px solid #F79682;'
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      const button = shadowRoot.getElementById('btnCreateAccount');
      expect(button.disabled).toBeTruthy();
  });

  it('test button create account enabled', async () => {
      const { shadowRoot } = await TestUtils.render(
        Register.tag, { id: 'registerBox' }
      );

      // insert valid name
      const input = shadowRoot.getElementById('inputNameText');
      const evtValidName = new CustomEvent('changeinput', {
        detail: {
                  inputvalues           : 'Name xyz',
                  focuselement          : 'inputNameText',
                  notEmptyBorderColor   : input.validateInput('Name xyz', 'empty')
                },
                bubbles: true
      })
      input.dispatchEvent(evtValidName);

      // insert valid password
      const inputPassword = shadowRoot.getElementById('inputPasswordText');
      const evtValidPassword = new CustomEvent('changeinput', {
        detail: {
                  colors      : inputPassword.validatePassword('Senha1234'),
                  inputvalues : 'Senha1234',
                  focuselement: 'inputPasswordText'
                },
                bubbles: true
      })
      inputPassword.dispatchEvent(evtValidPassword);

      // insert valid mail
      const inputMail = shadowRoot.getElementById('inputEmailText');
      const evtValidMail = new CustomEvent('changeinput', {
        detail: {
                  inputvalues           : '',
                  focuselement          : 'inputEmailText',
                  notEmptyBorderColor   : inputMail.validateInput('', 'empty'),
                  isValidMailBorderColor: inputMail.validateInput('mail@valid.com', 'mail')
                },
                bubbles: true
      })
      inputMail.dispatchEvent(evtValidMail);

      // insert valid confirm passwordText
      const inputConfirmPassword = shadowRoot.getElementById('inputConfirmPasswordText');
      const evtValidConfirmPassword = new CustomEvent('changeinput', {
        detail: {
                  colors      : inputPassword.validatePassword('Senha1234'),
                  inputvalues : 'Senha1234',
                  focuselement: 'inputConfirmPasswordText'
                },
                bubbles: true
      })
      inputConfirmPassword.dispatchEvent(evtValidConfirmPassword);

      const button = shadowRoot.getElementById('btnCreateAccount');
      expect(button.disabled).toEqual('undefined');
  });
  // Testing button createAccount end

});
