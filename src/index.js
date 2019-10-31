import '@webcomponents/webcomponentsjs'
import '@webcomponents/custom-elements'
import './components/olistButton/button'
import './components/olistText/text'
import './components/olistInput/input'
import './components/olistImage/image'
import './components/olistIndicator/indicator'
import styleIndex from './css/styleIndex.css'
import styleAccountCreated from './css/styleAccountCreated.css'
import styleButton from './css/styleButton.css'
import styleImage from './css/styleImage.css'
import styleText from './css/styleText.css'
import styleInput from './css/styleInput.css'
import styleIndicator from './css/styleIndicator.css'
import imgLogotype from './img/logotype.svg'
import imgIconConfirmed from './img/iconConfirmed.svg'
import messages from './messages'
import * as utils from './utils'
import * as endpoint from './services/endpoints'
import * as action from './services/actions'

const locale = navigator.language
const messagesByLocale = utils.flattenMessages(messages[utils.getLocale(locale)].detail)

export class Register extends HTMLElement {

    static get tag() {
        return 'olist-register';
    }

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this._id = 'defaultRegister'
        this._accountcreated = 'false'
    }

    static get observedAttributes() {
        return [
            'id',
            'accountcreated'
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const elementUpdate = {
                id            : () => (this._id = newValue),
                accountcreated: () => (this._accountcreated = newValue)
            }
            elementUpdate[name]()
            this._updateRendering()
        }
    }

    /**
     * @returns {} no return
     * @description Add a listener for input elements with the control parameters.
    */
    listenerChangeInput(e) {
        const elementsToColorValidator = [
            'inputPasswordText',
            '.passwordText',
            'divIndicatorOne',
            '.indicatorOne',
            'divIndicatorTwo',
            '.indicatorTwo',
            'divIndicatorThree',
            '.indicatorThree',
            'ruleOne',
            '.indicatorRuleOne',
            'ruleTwo',
            '.indicatorRuleTwo',
            'ruleThree',
            '.indicatorRuleThree'
        ]
        const elementsToFocus = [
            'inputEmailText',
            '.emailText',
            '.nameText'
        ]
        if (e) {
            const elementPassword = e.detail.focuselement === 'inputPasswordText' || e.detail.focuselement === 'inputConfirmPasswordText'
            const idElement = elementPassword ? e.detail.focuselement : 'inputDefault'
            const borderColor = e.detail.focuselement === 'inputEmailText' ? e.detail.isValidMailBorderColor : e.detail.notEmptyBorderColor
            const elements = {
                inputDefault: () => utils.setFocusUpdateInput(this.root, e.detail.focuselement, e.detail.inputvalues, styleInput, borderColor, elementsToFocus),
                inputPasswordText: () => utils.changeColorValidators(this.root, e.detail.inputvalues, e.detail.colors, styleIndicator, styleInput, elementsToColorValidator),
                inputConfirmPasswordText: () => utils.changeBorderColor(this.root, e.detail.inputvalues, styleInput, 'inputPasswordText', 'inputConfirmPasswordText', '.passwordText')
            }
            elements[idElement]()
        }
    }

    /**
     * @returns {} no return
     * @description Add a listener for button elements with the control parameters.
    */
    listenerButtonAction(e) {
        if (e) {
            const idElement = e.detail.idbutton
            if (idElement === 'btnCreateAccount') {
                const newUserName = utils.getInputValue(this.root, 'inputNameText')
                const newUserPassword = utils.getInputValue(this.root, 'inputPasswordText')
                const newUserMail = utils.getInputValue(this.root, 'inputEmailText')
                const newUser = action.createUserElement(newUserName, newUserPassword, newUserMail)
                const newUserResp = action.insertUserAccount(endpoint.createUserAccount, newUser)
                utils.createLoading(this.root)
                setTimeout(function () { action.redirectToConfirm(); }, 10000)
            }
        }
    }

    connectedCallback() {
        this.root.addEventListener('changeinput', e => {
            this.listenerChangeInput(e)
        })
        this.root.addEventListener('buttonaction', e => {
            this.listenerButtonAction(e)
        })
        this._updateRendering()
    }

    disconnectedCallback() {
        this.root.removeEventListener('changeinput', this.listenerChangeInput(null))
        this.root.removeEventListener('buttonaction', this.listenerButtonAction(null))
    }

    get id() {
        return this._id
    }

    set id(val) {
        this.setAttribute('id', val)
    }

    get accountcreated() {
        return this._accountcreated
    }

    set accountcreated(val) {
        this.setAttribute('accountcreated', val)
    }

    _updateRendering() {
        const templateForm = `
            <style>
                ${styleIndex}
            </style>
            <div id='${this.id}' class='registerBox'>
                <form class='formRegister' id='formRegister'>
                    <div id='divLogotype' class='divLogotype'>
                        <olist-image
                            id = 'imgLogoOlist'
                            src = ${imgLogotype}
                            classname = 'logotype'
                            styleimage = '${utils.getClassName(['.logotype'], styleImage)}'>
                        </olist-image>
                    </div>
                    <div id='divHeadTitle' class='divHeadTitle'>
                        <olist-text
                            content = '${messagesByLocale.textTitle}'
                            id = 'lblCrieConta'
                            classname = 'headTitle'
                            styletext = '${utils.getClassName(['.headTitle'], styleText)}'>
                        </olist-text>
                    </div>
                    <div id='divFieldName' class='divFieldName'>
                        <div id='divFieldNameTitle' class='divFieldNameTitle'>
                            <olist-text
                                content = '${messagesByLocale.textForName}'
                                id = 'lblName'
                                classname = 'name'
                                styletext = '${utils.getClassName(['.name'], styleText)}'>
                            </olist-text>
                        </div>
                        <div id='divFieldNameText' class='divFieldNameText'>
                            <olist-input
                                content = '${this.inputname ? this.inputname : ''}'
                                id = 'inputNameText'
                                name = 'inputNameText'
                                placeholder = '${messagesByLocale.placeHolderName}'
                                classname = 'nameText'
                                activelistener = 'true'
                                styleinput = '${utils.getClassName(['.nameText', 'input::placeholder'], styleInput)}'>
                            </olist-input>
                        </div>
                    </div>
                    <div id='divFieldEmail' class='divFieldEmail'>
                        <div id='divFieldEmailTitle' class='divFieldEmailTitle'>
                            <olist-text
                                content = '${messagesByLocale.textForEmail}'
                                id = 'lblEmail'
                                classname = 'email'
                                styletext = '${utils.getClassName(['.email'], styleText)}'>
                            </olist-text>
                        </div>
                        <div id='divFieldEmailText' class='divFieldEmailText'>
                            <olist-input
                                content = ''
                                id = 'inputEmailText'
                                name = 'inputEmailText'
                                placeholder = '${messagesByLocale.placeHolderEmail}'
                                classname = 'emailText'
                                activelistener = 'true'
                                styleinput = '${utils.getClassName(['.emailText', 'input::placeholder'], styleInput)}'>
                            </olist-input>
                        </div>
                    </div>
                    <div id='divFieldPassword' class='divFieldPassword'>
                        <div id='divFieldPasswordTitle' class='divFieldPasswordTitle'>
                            <olist-text
                                content = '${messagesByLocale.textForPassword}'
                                id = 'lblPassword'
                                classname = 'password'
                                styletext = '${utils.getClassName(['.password'], styleText)}'>
                            </olist-text>
                        </div>
                        <div id='divFieldPasswordText' class='divFieldPasswordText'>
                            <olist-input
                                content = ''
                                placeholder = '${messagesByLocale.placeHolderPassword}'
                                id = 'inputPasswordText'
                                name = 'inputPasswordText'
                                type = 'password'
                                classname = 'passwordText'
                                activelistener = 'true'
                                styleinput = '${utils.getClassName(['.passwordText', 'input::placeholder'], styleInput)}'>
                            </olist-input>
                        </div>
                    </div>
                    <div id='divIndicators' class='divIndicators'>
                        <olist-indicator class='divIndicatorsOne'
                            id = 'divIndicatorOne'
                            classname = 'indicatorOne'
                            stylediv = '${utils.getClassName(['.indicatorOne'], styleIndicator, utils.getColorsValidatorDefault().indicators.firstElement)}'>
                        </olist-indicator>
                        <olist-indicator class='divIndicatorsTwo'
                            id = 'divIndicatorTwo'
                            classname = 'indicatorTwo'
                            stylediv = '${utils.getClassName(['.indicatorTwo'], styleIndicator, utils.getColorsValidatorDefault().indicators.secondElement)}'>
                        </olist-indicator>
                        <olist-indicator class='divIndicatorsThree'
                            id = 'divIndicatorThree'
                            classname = 'indicatorThree'
                            stylediv = '${utils.getClassName(['.indicatorThree'], styleIndicator, utils.getColorsValidatorDefault().indicators.thirdElement)}'>
                        </olist-indicator>
                    </div>
                    <div id='divRulesGroup' class='divRulesGroup'>
                        <div id='divRuleOne' class='divRules'>
                            <olist-indicator class='divRulesRule'
                                id = 'ruleOne'
                                classname = 'indicatorRuleOne'
                                stylediv = '${utils.getClassName(['.indicatorRuleOne'], styleIndicator, utils.getColorsValidatorDefault().rules.firstElement)}'>
                            </olist-indicator>
                            <olist-text
                                    content = '${messagesByLocale.textRuleOne}'
                                    id = 'lblRuleOne'
                                    classname = 'rules'
                                    styletext = '${utils.getClassName(['.rules'], styleText)}'>
                            </olist-text>
                        </div>
                        <div id='divRuleTwo' class='divRules'>
                            <olist-indicator class='divRulesRule'
                                id = 'ruleTwo'
                                classname = 'indicatorRuleTwo'
                                stylediv = '${utils.getClassName(['.indicatorRuleTwo'], styleIndicator, utils.getColorsValidatorDefault().rules.secondElement)}'>
                            </olist-indicator>
                            <olist-text
                                    content = '${messagesByLocale.textRuleTwo}'
                                    id = 'lblRuleTwo'
                                    classname = 'rules'
                                    styletext = '${utils.getClassName(['.rules'], styleText)}'>
                            </olist-text>
                        </div>
                        <div id='divRuleThree' class='divRules'>
                            <olist-indicator class='divRulesRule'
                                id = 'ruleThree'
                                classname = 'indicatorRuleThree'
                                stylediv = '${utils.getClassName(['.indicatorRuleThree'], styleIndicator, utils.getColorsValidatorDefault().rules.thirdElement)}'>
                            </olist-indicator>
                            <olist-text
                                    content = '${messagesByLocale.textRuleThree}'
                                    id = 'lblRuleThree'
                                    classname = 'rules'
                                    styletext = '${utils.getClassName(['.rules'], styleText)}'>
                            </olist-text>
                        </div>
                    </div>
                    <div id='divFieldConfirmPassword' class='divFieldConfirmPassword'>
                        <div id='divFieldConfirmPasswordTitle' class='divFieldConfirmPasswordTitle'>
                            <olist-text
                                content = '${messagesByLocale.textForConfirmPassword}'
                                id = 'lblConfirmPassword'
                                classname = 'password'
                                styletext = '${utils.getClassName(['.password'], styleText)}'>
                            </olist-text>
                        </div>
                        <div id='divFieldConfirmPasswordText' class='divFieldConfirmPasswordText'>
                            <olist-input
                                content = ''
                                placeholder = '${messagesByLocale.placeHolderConfirmPassword}'
                                id = 'inputConfirmPasswordText'
                                name = 'inputConfirmPasswordText'
                                classname = 'passwordText'
                                type = 'password'
                                activelistener = 'true'
                                styleinput = '${utils.getClassName(['.passwordText', 'input::placeholder'], styleInput)}'>
                            </olist-input>
                        </div>
                    </div>
                    <div id='divBtnCreateAccount' class='divBtnCreateAccount'>
                        <olist-button
                            id = 'btnCreateAccount'
                            content = '${messagesByLocale.btnCreateAccount}'
                            classname = 'createAccount'
                            disabled = 'disabled'
                            stylebutton = '${utils.getClassName(['.createAccount', '.dotLoading', '.dotLarge', '.dotMedium', '.dotSmall'], styleButton)}'>
                        </olist-button>
                    </div>
                </form>
            </div>
            `

        const templateAccountCreated = `
            <style>
                ${styleAccountCreated}
            </style>
            <div id='${this.id}' class='loginBox'>
                <div id='divLogotype' class='divLogotype'>
                    <olist-image
                        id = 'imgConfirmLogoOlist'
                        src = ${imgLogotype}
                        classname = 'logotypeConfirmedBox'
                        styleimage = '${utils.getClassName(['.logotypeConfirmedBox'], styleImage)}'>
                    </olist-image>
                </div>
                <div id='divEllipse' class='divEllipse'>
                    <olist-image
                        id = 'imgIconConfirmed'
                        src = ${imgIconConfirmed}
                        classname = 'iconConfirmed'
                        styleimage = '${utils.getClassName(['.iconConfirmed'], styleImage)}'>
                    </olist-image>
                </div>
                <div id='divConfirmedTitle' class='divConfirmedTitle'>
                    <olist-text
                        content = '${messagesByLocale.textConfirmedTitle}'
                        id = 'lblConfirmTitle'
                        classname = 'msgConfirmTitle'
                        styletext = '${utils.getClassName(['.msgConfirmTitle'], styleText)}'>
                    </olist-text>
                </div>
                <div id='divConfirmedMsg' class='divConfirmedMsg'>
                    <olist-text
                        content = '${messagesByLocale.textConfirmedMsg}'
                        id = 'lblConfirmMsg'
                        classname = 'msgConfirmMail'
                        styletext = '${utils.getClassName(['.msgConfirmMail'], styleText)}'>
                    </olist-text>
                </div>
            </div>
    `
        this.root.innerHTML = this.accountcreated === 'true' ? templateAccountCreated : templateForm
    }

}

customElements.define(Register.tag, Register)
