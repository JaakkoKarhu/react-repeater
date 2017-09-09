import React from 'react'
import Children from 'react-children-utilities';

const isComp = (t) => {
  return typeof t.type=='function'
}

const isFunction = (f) => {
  const getType = {}
  return f && getType.toString.call(f) === '[object Function]'
}

const isMappable = (t) => { return t=='input'||t=='textarea' }

const isSpecialType = (t) => { return  t=='checkbox'|| t=='radio'||t=='color' }

const getInitialValue = (inputType, propValue, checked) => {
  if (['checkbox', 'radio'].indexOf(inputType) > -1) {
    return checked ? propValue : null
  } else {
    return propValue || null
  }
}

const getPropValueForSpecial = (type, propValue, mappedValue, rptkey) => {
  switch (type) {
    case 'checkbox':
    case 'radio':
        if (!!rptkey) {
            return { checked: propValue===mappedValue ? true : false }
        } else {
            return { checked: undefined }
        }    
        return propValue
        break
    case 'color':
        return { value: mappedValue || propValue || '#ffffff' }
        break;
    default:
        return mappedValue || ''
  }
}

const getSpecialOnChangeValue = (e) => {
    const { type, checked, value } = e.target
    switch (type) {
        case 'checkbox':
            return checked ? value : null
            break;
        default:
            return value
    }
}

const mapModel = (children=this.props.children, model={}) => {
    let nModel = {}
    React.Children.map(children, (child) => {
      /* Spreading here to avoid undefined errors.
       * Probably not the most efficient way.
       */
      const propsCp = { ...child.props },
            { value, checked} = propsCp,
            inputType = propsCp.type,
            rptKey = propsCp['data-rpt-key'],
            isNotSubmit = (['button', 'image', 'reset', 'submit'].indexOf(inputType) == -1)
      if (isMappable(child.type)&&isNotSubmit&&!rptKey) {
        // Note that child type is different than input type passed as prop
        // Print details about the child, to make it more easy to find
        console.warn('[react-repeater]:Input is missing rptKey. Data cannot be mapped to state properly. Please add rptKey prop to child element.')
      } else if (isMappable(child.type)&&!!rptKey&&(isNotSubmit||isComp(child))) {
        nModel[rptKey] = getInitialValue(inputType, value, checked )
      }
      if (propsCp.children) {
        nModel = mapModel(propsCp.children, nModel)
      }
    })

    return { ...model, ...nModel}
}

exports.isComp = isComp
exports.isFunction = isFunction
exports.isSpecialType = isSpecialType
exports.getInitialValue = getInitialValue
exports.getSpecialOnChangeValue = getSpecialOnChangeValue
exports.getPropValueForSpecial = getPropValueForSpecial
exports.isMappable = isMappable
exports.mapModel = mapModel
