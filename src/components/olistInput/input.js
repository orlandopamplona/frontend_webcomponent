export class Input extends HTMLElement {

    static get tag() {
        return 'olist-input';
    }

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this._id = 'inputDefault'
        this._width = 10
        this._height = 10
        this._content = 'DefaultContent'
        this._placeholder = 'Insert text here...'
        this._align = 'center'
        this._boxshadow = '0px 0px 0px 0px transparent'
        this._backgroundcolor = '#fff'
        this._fontsize = '12px'
        this._fontfamily = 'Roboto,sans-serif'
        this._fontcolor = '#000000'
        this._type = 'text'
        this._name = 'defaultName'
        this._readonly = ''
        this._classname = undefined
        this._styleinput = undefined
        this._activelistener = undefined
        this._typeMailValidation = undefined
        this._border = '1px solid #F7968'
    }

    static get observedAttributes() {
        return [
            'id',
            'width',
            'height',
            'content',
            'placeholder',
            'align',
            'boxshadow',
            'backgroundcolor',
            'fontsize',
            'fontfamily',
            'fontcolor',
            'type',
            'name',
            'readonly',
            'classname',
            'styleinput',
            'activelistener',
            'typeMailValidation',
            'border'
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const elementUpdate = {
                id                : () => (this._id = newValue),
                width             : () => (this._width = newValue),
                height            : () => (this._height = newValue),
                content           : () => (this._content = newValue),
                placeholder       : () => (this._placeholder = newValue),
                align             : () => (this._align = newValue),
                backgroundcolor   : () => (this._backgroundcolor = newValue),
                fontsize          : () => (this._fontsize = newValue),
                boxshadow         : () => (this._boxshadow = newValue),
                fontfamily        : () => (this._fontfamily = newValue),
                fontcolor         : () => (this._fontcolor = newValue),
                type              : () => (this._type = newValue),
                name              : () => (this._name = newValue),
                classname         : () => (this._classname = newValue),
                styleinput        : () => (this._styleinput = newValue),
                readonly          : () => (this._readonly = newValue),
                activelistener    : () => (this._activelistener = newValue),
                typeMailValidation: () => (this._typeMailValidation = newValue),
                border            : () => (this._border = newValue)
            }
            elementUpdate[name]()
            this._updateRendering()
        }
    }


    /**
     * @param {string} password Password in which rules will apply
     * @returns {Object} Element with color styles as a result of applied rules
     * @description Applies the rules to the given password and returns
     * the color style pattern to use according to the result obtained from the rules.
    */
    validatePassword(password) {

        const validBorder = 'border: 1px solid #17D499;'
        const invalidBorder = 'border: 1px solid #F79682;'

        const minSize = new RegExp('.{6,}')  // At least 6 characters
        const upCaseChar = new RegExp('.*[A-Z]') // At least 1 uppercase letter
        const numberChar = new RegExp('.*[0-9]') // At least 1 number

        const colorsValidators =
            [
                minSize.exec(password),
                upCaseChar.exec(password),
                numberChar.exec(password)
            ]

        const indicatorsOk = (colorsValidators.filter((satisfied) => {
            return (satisfied !== null)
        })).length

        const maxValueOK = 3
        let borderColor = indicatorsOk === maxValueOK ? validBorder : invalidBorder

        const indicators = {
            0: 'background: #EAEAF4;,background: #EAEAF4;,background: #EAEAF4;,',
            1: 'background: #F79682;,background: #EAEAF4;,background: #EAEAF4;,',
            2: 'background: #F7BC1C;,background: #F7BC1C;,background: #EAEAF4;,',
            3: 'background: #1FE6A8;,background: #1FE6A8;,background: #1FE6A8;,'
        }

        const ruleMinSize = colorsValidators[0] ? 'background: #1FE6A8;,' : 'background: #F79682;,'
        const ruleUpCaseChar = colorsValidators[1] ? 'background: #1FE6A8;,' : 'background: #F79682;,'
        const ruleNumberChar = colorsValidators[2] ? 'background: #1FE6A8;,' : 'background: #F79682;,'
        const allRules = ''
        const rules = password ? allRules.concat(ruleMinSize, ruleUpCaseChar, ruleNumberChar) : 'background: #EAEAF4;,background: #EAEAF4;,background: #EAEAF4;,'

        return indicators[indicatorsOk].concat(rules).concat(borderColor)
    }

    /**
     * @param {string} email Email in which rules will apply
     * @returns {boolean} Email Rules Validation Result
     * @description Checks through regular expression if the email
     * entered has the structure of a valid email
    */
    validateEmail(email) {
        const ruleValidation = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i
        return ruleValidation.test(email)
    }

    /**
     * @param {string} inputValue Input field contents
     * @returns {boolean} Input field Rules Validation Result
     * @description Checks through regular expression the input
     * field has some value or is empty
    */
    validateEmptyField(inputValue) {
        const notEmpty = new RegExp('.{1,}')  // At least 1 character
        return notEmpty.test(inputValue)
    }

    /**
     * @param {string} inputValue Input field contents
     * @param {string} typeValidation Input field type, for an
     * email type input the rules are different from other inputs
     * @returns {boolean} Validation of the corresponding input type
     * @description Check the type of an input field and perform
     * specific validation according to the given rules.
    */
    validateInput(inputValue, typeValidation) {
        const validBorder = 'border: 1px solid #17D499;'
        const invalidBorder = 'border: 1px solid #F79682;'
        if (typeValidation === 'mail') {
            return this.validateEmail(inputValue) ? validBorder : invalidBorder
        } else {
            return this.validateEmptyField(inputValue) ? validBorder : invalidBorder
        }

    }

    /**
     * @returns {} no return
     * @description Add a password listener with its control parameters
    */
    actionInputPassword() {
        const evtPassword = new CustomEvent('changeinput', {
            detail: {
                colors: this.validatePassword(this.root.getElementById(this.id).value),
                inputvalues: this.root.getElementById(this.id).value,
                focuselement: this.id
            },
            bubbles: true,
            cancelable: false
        })
        this.dispatchEvent(evtPassword)
    }


    /**
     * @returns {} no return
     * @description Add a default listener with its control parameters
    */
    actionInputDefault() {
        const evt = new CustomEvent('changeinput', {
            detail: {
                inputvalues: this.root.getElementById(this.id).value,
                focuselement: this.id,
                notEmptyBorderColor: this.validateInput(this.root.getElementById(this.id).value, 'empty'),
                isValidMailBorderColor: this.validateInput(this.root.getElementById(this.id).value, 'mail')
            },
            bubbles: true,
            cancelable: false
        })
        this.dispatchEvent(evt)
    }

    /**
     * @returns {} no return
     * @description Add a listener according to the type of input used (password or other)
     * triggering an event that will be intercepted for further processing.
    */
    addListener() {
        if (this.activelistener) {
            if (this.type === 'password') {
                this.oninput = () => { this.actionInputPassword() }
            } else {
                this.oninput = () => { this.actionInputDefault() }
            }
        }
    }

    connectedCallback() {
        this._updateRendering()
        this.addListener()
    }

    disconnectedCallback() {
        this.type === 'password' ? this.removeEventListener('input', () => { this.actionInputPassword() })
            : this.removeEventListener('input', () => { this.actionInputDefault() })
    }

    get id() {
        return this._id
    }

    set id(val) {
        this.setAttribute('id', val)
    }

    get width() {
        return this._width
    }

    set width(val) {
        this.setAttribute('width', val)
    }

    get height() {
        return this._height
    }

    set height(val) {
        this.setAttribute('height', val)
    }

    get content() {
        return this._content
    }

    set content(val) {
        this.setAttribute('content', val)
    }

    get placeholder() {
        return this._placeholder
    }

    set placeholder(val) {
        this.setAttribute('placeholder', val)
    }

    get align() {
        return this._align
    }

    set align(val) {
        this.setAttribute('align', val)
    }

    get boxshadow() {
        return this._boxshadow
    }

    set boxshadow(val) {
        this.setAttribute('boxshadow', val)
    }

    get backgroundcolor() {
        return this._backgroundcolor
    }

    set backgroundcolor(val) {
        this.setAttribute('backgroundcolor', val)
    }

    get fontsize() {
        return this._fontsize
    }

    set fontsize(val) {
        this.setAttribute('fontsize', val)
    }

    get fontfamily() {
        return this._fontfamily
    }

    set fontfamily(val) {
        this.setAttribute('fontfamily', val)
    }

    get fontcolor() {
        return this._fontcolor
    }

    set fontcolor(val) {
        this.setAttribute('fontcolor', val)
    }

    get type() {
        return this._type
    }

    set type(val) {
        this.setAttribute('type', val)
    }

    get name() {
        return this._name
    }

    set name(val) {
        this.setAttribute('name', val)
    }

    get value() {
        return this._value
    }

    set readonly(val) {
        this.setAttribute('readonly', val)
    }

    get classname() {
        return this._classname
    }

    set classname(val) {
        this.setAttribute('classname', val)
    }

    get styleinput() {
        return this._styleinput
    }

    set styleinput(val) {
        this.setAttribute('styleinput', val)
    }

    get activelistener() {
        return this._activelistener
    }

    set activelistener(val) {
        this.setAttribute('activelistener', val)
    }

    get typeMailValidation() {
        return this._typeMailValidation
    }

    set typeMailValidation(val) {
        this.setAttribute('typeMailValidation', val)
    }

    get border() {
        return this._border
    }

    set border(val) {
        this.setAttribute('border', val)
    }

    _updateRendering() {
        const defaultStyle = this.styleinput ? this.styleinput : `.inputStyle {
                                                                 width : ${this.width};
                                                                 height: ${this.height};
                                                                 text-align: ${this.align};
                                                                 box-shadow: ${this.boxshadow};
                                                                 background-color: ${this.backgroundcolor};
                                                                 font-size: ${this.fontsize};
                                                                 font-family: ${this.fontfamily};
                                                                 color: ${this.fontcolor};
                                                                 border: ${this.border};}`

        const templateStyle = (this.classname ? this.classname : 'inputStyle')

        const template =
            `<style>
                ${defaultStyle}
            </style>
            <input
                type='${this.type}'
                id='${this.id}'
                name='${this.name}'
                class='${templateStyle}'
                placeholder='${this.placeholder}'
                value='${this.content}'
                onfocus='this.setSelectionRange(this.value.length, this.value.length);'
                ${this.readonly ? this.readonly : ''}
                ${this.setfocus ? 'autofocus' : ''}
            >
            </input>`
        this.root.innerHTML = template
    }
}

customElements.define(Input.tag, Input)
