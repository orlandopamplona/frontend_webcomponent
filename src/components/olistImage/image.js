import noImage from './img/noImage.svg'

export class Image extends HTMLElement {

    static get tag() {
        return 'olist-image';
    }

    constructor() {
        super()
        this.root = this.attachShadow({ mode: 'open' })
        this._id = 'imgDefault'
        this._src = noImage
        this._width = 100
        this._height = 50
        this._align = 'center'
        this._boxshadow = '0px 0px 0px 0px transparent'
        this._classname = undefined
        this._styleimage = undefined
    }

    static get observedAttributes() {
        return [
            'id',
            'src',
            'width',
            'height',
            'align',
            'boxshadow',
            'classname',
            'styleimage'
        ]
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            const elementUpdate = {
                id        : () => (this._id = newValue),
                src       : () => (this._src = newValue),
                width     : () => (this._width = newValue),
                height    : () => (this._height = newValue),
                align     : () => (this._align = newValue),
                boxshadow : () => (this._boxshadow = newValue),
                classname : () => (this._classname = newValue),
                styleimage: () => (this._styleimage = newValue)
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

    get src() {
        return this._src
    }

    set src(val) {
        this.setAttribute('src', val)
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

    get styleimage() {
        return this._styleimage
    }

    set styleimage(val) {
        this.setAttribute('styleimage', val)
    }

    _updateRendering() {
        const defaultStyle = this.styleimage ? this.styleimage : `.imageStyle {
                                                                 width : ${this.width};
                                                                 height: ${this.height};
                                                                 box-shadow: ${this.boxshadow};}`

        const templateStyle = (this.classname ? this.classname : 'imageStyle')

        const defaultImage = (this.src ? this.src : noImage)

        const template =
            `<style>
                ${defaultStyle}
            </style>
            <img src='${defaultImage}' class='${templateStyle}' id='${this.id}'></img>`

        this.root.innerHTML = template
    }
}

customElements.define(Image.tag, Image)
