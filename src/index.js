/*
 * TODO
 * 
 * - Add functionality for textarea
 * - Make sure that button dataKeys are not required
 * - Test: two inputs of a same type
 * - Add delete buttons
 * - Add delete buttons location propType?
 * - Write following examples:
 * - - With all possible input types
 * - Nested repeater
 * - With Bootstrap
 * - Should the initial values be null or an empty string?
 * - Write docs
 *
 * SPECIAL CASES
 *
 * Non-collectable:
 *
 * - Button
 * - Image
 * - Reset
 * - Submit
 * 
 * Default prop value static:
 *
 * - Button
 * - Checkbox
 * - Image
 * - Radio
 * - Reset
 * - Submit
 *
 * Needs custom default value:
 *
 * - Color
 *
 * Other, yet undefined special cases:
 *
 * - File (returns with fakepath)
 *
 * ------------------------------------
 */

import PropTypes from 'prop-types'
import React from 'react'

const isFunction = (f) => {
  const getType = {}
  return f && getType.toString.call(f) === '[object Function]'
}

const isMappable = (t) => {

  return t=='input'||t=='textarea'
}

const getInitialValue = (inputType, propValue, checked) => {
  if (['checkbox', 'radio'].indexOf(inputType) > -1) {
    return checked ? propValue : null
  } else {
    return propValue || null
  }
}

const getValue = (inputType, propValue, mappedValue) => {
  switch (inputType) {
    case 'checkbox':
    case 'radio':
      return propValue
      break
    case 'color':
      return mappedValue || '#ffffff'
      break;
    default:
      return mappedValue || ''
  }
}

class Repeater extends React.Component {
  static propTypes = {
    collect: PropTypes.func,
    data: PropTypes.array
  }

  constructor(props) {
    super(props)
    this.state = {
      dataValues: [{}]
    }
  }

  init = () => {
    const { children } = this.props
    const initValues = (children, index) => {
      return React.Children.map(children, (child) => {
        /* Spreading here to avoid undefined errors.
         * Probably not the most efficient way.
         */
        const propsCp = { ...child.props },
              { dataKey, value, checked} = propsCp,
              inputType = propsCp.type,
              isNotSubmit = (['button', 'image', 'reset', 'submit'].indexOf(inputType) == -1)
        if (isMappable(child.type)&&!dataKey) {
          // Note that child type is different than input type passed as prop
          // Print details about the child, to make it more easy to find
          console.warn('[react-repeater]:Input is missing dataKey. Data cannot be mapped to state properly. Please add dataKey prop to child element.')
        } else if (isMappable(child.type)&&isNotSubmit) {
          const nDataValues = [ ...this.state.dataValues ]
          nDataValues[index][dataKey] = getInitialValue(inputType, value, checked )
        }
        if (propsCp.children) initValues(propsCp.children, index)
      })
    }
    for (let i = 0; this.state.dataValues.length > i; i++) {
      initValues(children, i)
    }
  }

  componentWillMount = () => {
    const { data } = this.props
    if (data) this.setState({ dataValues: data })
    this.init()
  }

  add = () => {
    this.setState({ dataValues: [ ...this.state.dataValues, {} ] }, this.init)
  }

  onChange = (e, index, dataKey, inputType, cb) => {
    /* Make switch statement here to check the type,
     * store input value accordingly
     *
     */
    const nDataValues = [ ...this.state.dataValues ]
    if (inputType=='checkbox'&&!e.target.checked) {
      nDataValues[index][dataKey] = ''
    } else {
      nDataValues[index][dataKey] = e.target.value // Assign here instead of reading the e directly
    }
    this.setState({ dataValues: nDataValues })
    if (isFunction(cb)) cb(e, nDataValues)
  }

  getElems = () => {
    const { dataValues } = this.state,
          elems = [],
          { props } = this
    const copyChildren = (children, index) => {
      return React.Children.map(children, (child) => {
        const propsCp = { ...child.props },
              { dataKey, onChange } = propsCp,
              inputType = propsCp.type,
              isNotSubmit = (['button', 'image', 'reset', 'submit'].indexOf(inputType) == -1),
              isToggle = (['checkbox', 'radio'].indexOf(inputType) > -1)
        propsCp.children = copyChildren(propsCp.children, index)
        // Check the case for arrays as well?
        if (isMappable(child.type)&&!dataKey) {
          console.warn('[react-repeater]:Input is missing dataKey. Data cannot be mapped to state properly. Please add dataKey prop to child element.')
        } else if (isMappable(child.type)&&isNotSubmit) {
          const { value } = propsCp,
                nValue = getValue(inputType, value, dataValues[index][dataKey])
          propsCp.onChange = (e) => this.onChange(e, index, dataKey, inputType, onChange)
          propsCp.value = nValue
        }
        // Check if radio||checkbox should be checked according to passed data
        if (isToggle&&dataValues[index][dataKey]===propsCp.value) {
          propsCp.checked = true
        } else {
          propsCp.checked = false
        }
        delete propsCp.dataKey // Not sure if this is a good idea instead of using data-key
        return child.type
               ? React.createElement(child.type, { ...propsCp } )
               : child
      })
    }
    for (let i = 0; dataValues.length > i; i++) {
      let elem = copyChildren(props.children, i)
      elems.push(elem)
    }
    return elems
  }

  render() {
    let { add } = this
    return (
      <div className={ `repeater` }>
        { this.getElems() }
        <div className={ `repeater-add` } // Convert to button
             onClick={ add } />
      </div>
    )
  }

}

export default Repeater