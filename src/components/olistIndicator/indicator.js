export class Indicator extends HTMLElement {

    static get tag() {
        return 'olist-indicator';
    }

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this._id = 'indicatorDefault'
        this._width = 100
        this._height = 50
        this._align = 'center'
        this._boxshadow = '0px 0px 0px 0px transparent'
        this._classname = undefined
        this._stylediv = undefined
    }

    static get observedAttributes() {
        return [
            'id',
            'width',
            'height',
            'align',
            'boxshadow',
            'classname',
            'stylediv'
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const elementUpdate = {
                id       : () => (this._id = newValue),
                width    : () => (this._width = newValue),
                height   : () => (this._height = newValue),
                align    : () => (this._align = newValue),
                boxshadow: () => (this._boxshadow = newValue),
                classname: () => (this._classname = newValue),
                stylediv : () => (this._stylediv = newValue)
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

    get classname() {
        return this._classname
    }

    set classname(val) {
        this.setAttribute('classname', val)
    }

    get stylediv() {
        return this._stylediv
    }

    set stylediv(val) {
        this.setAttribute('stylediv', val)
    }

    _updateRendering() {
        const defaultStyle = this.stylediv ? this.stylediv : `.divStyle {
                                                              width : ${this.width};
                                                              height: ${this.height};
                                                              box-shadow: ${this.boxshadow};}`

        const templateStyle = (this.classname ? this.classname : 'divStyle')

        const template =
            `<style>
                ${defaultStyle}
            </style>
            <div id='${this.id}' class='${templateStyle}'></div>`
        this.root.innerHTML = template
    }
}

customElements.define(Indicator.tag, Indicator)
