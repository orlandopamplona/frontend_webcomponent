export class Button extends HTMLElement {

    static get tag() {
        return 'olist-button';
    }

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this._id = 'btDefault'
        this._width = 100
        this._height = 50
        this._content = 'DefaultContent'
        this._align = 'center'
        this._boxshadow = '0px 0px 0px 0px transparent'
        this._backgroundcolor = '#fff'
        this._fontsize = '12px'
        this._fontfamily = 'Roboto,sans-serif'
        this._fontcolor = '#000000'
        this._type = 'button'
        this._disabled = undefined
        this._classname = undefined
        this._stylebutton = undefined
        this._onclick = undefined
    }

    static get observedAttributes() {
        return [
            'id',
            'width',
            'height',
            'content',
            'align',
            'boxshadow',
            'backgroundcolor',
            'fontsize',
            'fontfamily',
            'fontcolor',
            'type',
            'disabled',
            'classname',
            'stylebutton',
            'onclick'
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const elementUpdate = {
                id             : () => (this._id = newValue),
                width          : () => (this._width = newValue),
                height         : () => (this._height = newValue),
                content        : () => (this._content = newValue),
                align          : () => (this._align = newValue),
                boxshadow      : () => (this._boxshadow = newValue),
                backgroundcolor: () => (this._backgroundcolor = newValue),
                fontsize       : () => (this._fontsize = newValue),
                fontfamily     : () => (this._fontfamily = newValue),
                fontcolor      : () => (this._fontcolor = newValue),
                type           : () => (this._type = newValue),
                disabled       : () => (this._disabled = newValue),
                classname      : () => (this._classname = newValue),
                stylebutton    : () => (this._stylebutton = newValue),
                onclick        : () => (this._onclick = newValue)
            }
            elementUpdate[name]()
            this._updateRendering()
        }
    }

    /**
     * @returns {} no return
     * @description Add a listener with its control parameters
    */
    actionButtonClick() {
        const evt = new CustomEvent('buttonaction', {
            detail: {
                idbutton: this.id
            },
            bubbles: true,
            cancelable: false
        })
        this.dispatchEvent(evt)
    }


    /**
     * @returns {} no return
     * @description Add a button click listener triggering an event that
     * will be intercepted for further handling.
    */
    addListener() {
        this.root.addEventListener("click", () => {
            this.actionButtonClick()
        })
    }

    /**
     * @returns {} no return
     * @description Creates the button loading effect on click
    */
   loadingDots(position) {
        const dotsLoading = {
            1: {
                dotValue: '<div id="dotsLoading" class="dotLoading"><div id="dotOne" class="dotLarge"></div><div id="dotTwo" class="dotMedium"></div><div id="dotThree" class="dotSmall"></div></div>'
            },
            2: {
                dotValue: '<div id="dotsLoading" class="dotLoading"><div id="dotOne" class="dotSmall"></div><div id="dotTwo" class="dotLarge"></div><div id="dotThree" class="dotMedium"></div></div>'
            },
            3: {
                dotValue: '<div id="dotsLoading" class="dotLoading"><div id="dotOne" class="dotMedium"></div><div id="dotTwo" class="dotSmall"></div><div id="dotThree" class="dotLarge"></div></div>'
            }
        }
        return dotsLoading[position].dotValue
    }

    /**
     * @returns {} no return
     * @description Captures the animation element that will be used
    */
    showLoading() {
        const loadings = ['loadingDots_1', 'loadingDots_2', 'loadingDots_3']
        if (loadings.includes(this.content)) {
            let position = this.content.slice(-1)
            return this.loadingDots(position)
        } else {
            return this.content
        }
    }

    connectedCallback() {
        this._updateRendering()
        this.addListener()
    }

    disconnectedCallback() {
        this.removeEventListener('click', () => { this.actionButtonClick() })
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

    get disabled() {
        return this._disabled
    }

    set disabled(val) {
        this.setAttribute('disabled', val)
    }

    get classname() {
        return this._classname
    }

    set classname(val) {
        this.setAttribute('classname', val)
    }

    get stylebutton() {
        return this._stylebutton
    }

    set stylebutton(val) {
        this.setAttribute('stylebutton', val)
    }

    get onclick() {
        return this._onclick
    }

    set onclick(val) {
        this.setAttribute('onclick', val)
    }

    _updateRendering() {
        const defaultStyle = this.stylebutton ? this.stylebutton : `.buttonStyle {
                                                                  width : ${this.width};
                                                                  height: ${this.height};
                                                                  text-align: ${this.align};
                                                                  box-shadow: ${this.boxshadow};
                                                                  background-color: ${this.backgroundcolor};
                                                                  font-size: ${this.fontsize};
                                                                  font-family: ${this.fontfamily};
                                                                  color: ${this.fontcolor};}`

        const templateStyle = (this.classname ? this.classname : 'buttonStyle')

        const template =
            `<style>
                ${defaultStyle}
            </style>
            <button id=${this.id}
                    type=${this.type}
                    class='${templateStyle}'
                    ${this.disabled}
            >
                ${this.showLoading()}
            </button>`
        this.root.innerHTML = template
    }
}
customElements.define(Button.tag, Button)
