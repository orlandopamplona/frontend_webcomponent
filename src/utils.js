/**
 * @param {String} injectProperty CSS tag to be added to the fetched element
 * @param {String} originalCss CSS element containing all tag used
 * @param {Object} classNameList CSS class identifier changed
 * @returns {Object} CSS block changed with new tag added
 * @description CSS class identifier changed
*/
export const setPropertyCss = (injectProperty, originalCss, classNameList) => {
    let cssInjected = originalCss
    let replaceElement = classNameList + ' {'
    let newElement = replaceElement + '\n  ' + injectProperty
    cssInjected = cssInjected.replace(replaceElement, newElement)
    return cssInjected
}

/**
 * @param {Object} classNameList CSS element containing all styles used
 * @param {String} css CSS style identifier that will be fetched from the full element
 * @param {String} injectProperty CSS tag to be added to the fetched element
 * @returns {Object} CSS block changed with new tag added
 * @description Searches for a particular element in the CSS style collection
 * and adds a certain tag to it
*/
export const getClassName = (classNameList, css, injectProperty) => {
    let styleElement = ''
    let matchFull = 0
    for (let className of classNameList) {
        let regexp = new RegExp(className + '([^<]+?)}')
        let classFound = regexp.exec(css)
        styleElement += (classFound[matchFull] + '\n\n')
    }
    return injectProperty ? setPropertyCss(injectProperty, css, classNameList) : styleElement
}

/**
 * @param {string} colors Color information to apply to styles
 * @returns {Object} Colors formatted to standard used
 * @description Receives the color value for each screen element
 * and formats this information for the pattern used later
*/
export const formatColorsValidators = (colors) => {
    let colorsFormatted = colors.split(',')
    for (let i = 0; i < colorsFormatted.length; i++) {
        colorsFormatted[i] = colorsFormatted[i].replace('\n', '').trim()
    }
    let colorsValidatorFormatted = {
        indicators: {
            firstElement: colorsFormatted[0],
            secondElement: colorsFormatted[1],
            thirdElement: colorsFormatted[2]
        },
        rules: {
            firstElement: colorsFormatted[3],
            secondElement: colorsFormatted[4],
            thirdElement: colorsFormatted[5]
        },
        border: {
            color: colorsFormatted[6]
        }
    }
    return colorsValidatorFormatted
}

/**
 * @returns {Object} Initial color style for elements
 * @description Provides initial color style for elements before rules apply
*/
export const getColorsValidatorDefault = () => {
    return {
        indicators: {
            firstElement: 'background: #EAEAF4;',
            secondElement: 'background: #EAEAF4;',
            thirdElement: 'background: #EAEAF4;'
        },
        rules: {
            firstElement: 'background: #EAEAF4;',
            secondElement: 'background: #EAEAF4;',
            thirdElement: 'background: #EAEAF4;'
        },
        border: {
            color: 'border: 1px solid #FFFFFF;'
        }
    }
}

/**
 * @param {string} actualLocale Locale captured from the environment in which the application is running
 * @returns {string} Locale default (pt-BR) or the locale itself informed
 * @description Receives the value of the locale captured from the environment in which the application
 * is running, if it is invalid, returns the default locale pt-BR.
*/
export const getLocale = (actualLocale) => {
    return ((actualLocale) ? actualLocale : 'pt-BR')
}

/**
 * @param {Object} nestedMessages Element with all keys for current locale
 * @returns {Object} Default key/value element with internationalization information as per current locale
 * @description Search elements in key/value pattern for internationalization according to current locale
*/
export const flattenMessages = (nestedMessages, prefix = '') => {
    return Object.keys(nestedMessages).reduce((messages, key) => {
        let value = nestedMessages[key]
        let prefixedKey = prefix ? `${prefix}.${key}` : key
        if (typeof value === 'string') {
            messages[prefixedKey] = value
        } else {
            Object.assign(messages, this.flattenMessages(value, prefixedKey))
        }
        return messages
    }, {})
}

/**
 * @param {Object} rootElement Html root object that contains the other elements to be manipulated
 * @param {String} passwordInput Input element manipulated in processing
 * @param {String} styleInput CSS identifier that will be bound to the input element
 * @param {String} idElement Identifies the main element to handle.
 * @param {String} idElementConfirm Identifies the secondary element to handle.
 * @param {String} className Identifies the class name element to handle.
 * @returns {} no return
 * @description Change the border color of an input element according to the applied
 * rule (red for missed rule and green for satisfied rule)
*/
export const changeBorderColor = (rootElement, passwordInput, styleInput, idElement, idElementConfirm, className) => {
    const validBorder = `border: 1px solid #17D499;`
    const invalidBorder = `border: 1px solid #F79682;`
    let elementSelected = rootElement.getElementById(idElementConfirm)
    elementSelected.content = passwordInput
    let elementPasswordOrigin = rootElement.getElementById(idElement).content
    let borderColor = elementPasswordOrigin === passwordInput ? validBorder : invalidBorder
    elementSelected.styleinput = getClassName([className], styleInput, borderColor)

    let insideInput = elementSelected.shadowRoot.getElementById(idElementConfirm)
    insideInput.focus()
    enableSubmitButton(rootElement)
}

/**
 * @param {Object} rootElement Html root object that contains the other elements to be manipulated
 * @param {String} idInput ID identifier of an element
 * @returns {string} Text information with the value of the element's content property
 * @description Find an element by its ID and return the value of its content property
*/
export const getInputValue = (rootElement, idInput) => {
    let elementSelected = rootElement.getElementById(idInput)
    return elementSelected.content
}

/**
 * @param {Object} rootElement Html root object that contains the other elements to be manipulated
 * @param {String} passwordInput Input element manipulated in processing
 * @param {String} colors Color rule to apply to indicators
 * @param {String} styleIndicator CSS element used in rule flags
 * @param {String} styleInput CSS identifier that will be bound to the input element
 * @param {String[]} elementsToColorValidator Identifies the elements ids to handle.
 * @returns {} no return
 * @description Changes indicator colors to represent the rules met
*/
export const changeColorValidators = (rootElement, passwordInput, colors, styleIndicator, styleInput, elementsToColorValidator) => {
    let elementPosition = 0
    const elementSelected = rootElement.getElementById(elementsToColorValidator[elementPosition++])
    elementSelected.content = passwordInput
    const newColorValidator = formatColorsValidators(colors)
    elementSelected.styleinput = getClassName([elementsToColorValidator[elementPosition--]], styleInput, newColorValidator.border.color)

    const insideInput = elementSelected.shadowRoot.getElementById(elementsToColorValidator[elementPosition++])
    insideInput.focus()

    elementPosition++
    const elementDivIndicatorOne =  rootElement.getElementById(elementsToColorValidator[elementPosition++])
    elementDivIndicatorOne.stylediv = getClassName([elementsToColorValidator[elementPosition++]], styleIndicator, newColorValidator.indicators.firstElement)

    const elementDivIndicatorTwo =  rootElement.getElementById(elementsToColorValidator[elementPosition++])
    elementDivIndicatorTwo.stylediv = getClassName([elementsToColorValidator[elementPosition++]], styleIndicator, newColorValidator.indicators.secondElement)

    const elementDivIndicatorThree =  rootElement.getElementById(elementsToColorValidator[elementPosition++])
    elementDivIndicatorThree.stylediv = getClassName([elementsToColorValidator[elementPosition++]], styleIndicator, newColorValidator.indicators.thirdElement)

    const elementRuleOne =  rootElement.getElementById(elementsToColorValidator[elementPosition++])
    elementRuleOne.stylediv = getClassName([elementsToColorValidator[elementPosition++]], styleIndicator, newColorValidator.rules.firstElement)

    const elementRuleTwo =  rootElement.getElementById(elementsToColorValidator[elementPosition++])
    elementRuleTwo.stylediv = getClassName([elementsToColorValidator[elementPosition++]], styleIndicator, newColorValidator.rules.secondElement)

    const elementRuleThree =  rootElement.getElementById(elementsToColorValidator[elementPosition++])
    elementRuleThree.stylediv = getClassName([elementsToColorValidator[elementPosition++]], styleIndicator, newColorValidator.rules.thirdElement)

    enableSubmitButton(rootElement)
}

/**
 * @param {Object} rootElement Html root object that contains the other elements to be manipulated
 * @param {String} element Input element manipulated in processing
 * @param {String} value Text-like information that will be displayed inside the input element
 * @param {String} styleInput CSS identifier that will be bound to the input element
 * @param {String} borderColor Border color to apply (red for missed rule and green for satisfied rule)
 * @param {String[]} elementsToFocus Identifies the elements ids to handle.
 * @returns {} no return
 * @description Reapply the current status of the element and position the focus cursor on it.
*/
export const setFocusUpdateInput = (rootElement, element, value, styleInput, borderColor, elementsToFocus) => {
    const classNameToSearch = element === elementsToFocus[0] ? elementsToFocus[1] : elementsToFocus[2]
    const elementSelected = rootElement.getElementById(element)
    elementSelected.content = value
    elementSelected.styleinput = getClassName([classNameToSearch], styleInput, borderColor)

    const insideInput = elementSelected.shadowRoot.getElementById(element)
    insideInput.focus()
    enableSubmitButton(rootElement)
}

/**
 * @param {Object} rootElement Html root object that contains the other elements to be manipulated
 * @returns {} no return
 * @description Responsible for checking that all rules have been met when filling in the information
 * to enable the release of the button that creates the accounts.
*/
export const enableSubmitButton = (rootElement) => {
    const validBorder = '1px solid #17D499'
    const rootField = rootElement.getElementById('registerBox')
    const inputFields = rootField.getElementsByTagName('olist-input')
    let enableButton = 0
    for (let i = 0; i < inputFields.length; i++) {
        enableButton += inputFields[i].styleinput.indexOf(validBorder) > -1 ? 1 : 0
    }
    let buttonSelected = rootElement.getElementById('btnCreateAccount')
    buttonSelected.disabled = enableButton === inputFields.length ? undefined : 'disabled'
}


let timeout = false;
let dotValue = 1
const frequency = 500;

/**
 * @param {Object} rootElement Html root object that contains the other elements to be manipulated
 * @returns {} no return
 * @description Responsible for loading animation for the button that creates the accounts,
 * switching between the elements that will be displayed to give the impression of moving.
*/
export const createLoading = (rootElement) => {
    let buttonSelected = rootElement.getElementById("btnCreateAccount")
    timeout = setTimeout(function(){ createLoading(rootElement); }, frequency)
    buttonSelected.content = "loadingDots_" + dotValue
    dotValue === 3 ? dotValue = 1 : dotValue += 1
}