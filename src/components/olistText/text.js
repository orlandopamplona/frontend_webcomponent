export class Text extends HTMLElement {

    static get tag() {
        return 'olist-text';
    }

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this._id = 'lbDefault'
        this._content = 'DefaultContent'
        this._h_align = 'center'
        this._v_align = 'center'
        this._backgroundcolor = '#fff'
        this._fontsize = '12px'
        this._fontfamily = 'Roboto,sans-serif'
        this._fontcolor = '#000000'
        this._classname = undefined
        this._styletext = undefined
    }

    static get observedAttributes() {
        return [
            'id',
            'v_align',
            'content',
            'h_align',
            'backgroundcolor',
            'fontsize',
            'fontfamily',
            'fontcolor',
            'classname',
            'styletext'
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const elementUpdate = {
                id             : () => (this._id = newValue),
                width          : () => (this._width = newValue),
                height         : () => (this._height = newValue),
                content        : () => (this._content = newValue),
                h_align        : () => (this._h_align = newValue),
                v_align        : () => (this._v_align = newValue),
                backgroundcolor: () => (this._backgroundcolor = newValue),
                fontsize       : () => (this._fontsize = newValue),
                fontfamily     : () => (this._fontfamily = newValue),
                fontcolor      : () => (this._fontcolor = newValue),
                classname      : () => (this._classname = newValue),
                styletext      : () => (this._styletext = newValue)
            }
            elementUpdate[name]()
            this._updateRendering()
        }
    }

    connectedCallback() {
        this._updateRendering()
    }

    get id() {
        return this._id
    }

    set id(val) {
        this.setAttribute('id', val)
    }

    get content() {
        return this._content
    }

    set content(val) {
        this.setAttribute('content', val)
    }

    get v_align() {
        return this._v_align
    }

    set v_align(val) {
        this.setAttribute('v_align', val)
    }

    get h_align() {
        return this._h_align
    }

    set h_align(val) {
        this.setAttribute('h_align', val)
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

    get classname() {
        return this._classname
    }

    set classname(val) {
        this.setAttribute('classname', val)
    }

    get styletext() {
        return this._styletext
    }

    set styletext(val) {
        this.setAttribute('styletext', val)
    }

    _updateRendering() {
        const defaultStyle = this.styletext ? this.styletext : `.textStyle {
                                                              text-align: ${this.h_align};
                                                              vertical-align: ${this.v_align};
                                                              background-color: ${this.backgroundcolor};
                                                              font-size: ${this.fontsize};
                                                              font-family: ${this.fontfamily};
                                                              color: ${this.fontcolor};}`

        const templateStyle = (this.classname ? this.classname : 'textStyle')

        const template =
            `<style>
                ${defaultStyle}
            </style>
            <span id='${this.id}'
                class='${templateStyle}'
            >
                ${this.content}
            </span>`
        this.root.innerHTML = template
    }
}

customElements.define(Text.tag, Text)
