/*
 * TODO
 * 
 * - Collect data structure in init
 * - Add is not submit to getElems
 * - Test: checkbox and radio on init
 * - Test: returned data structure has to be same as the one which is entered?
 * - Test special cases for all input prop-types
 * - Use default input values, when they are not empty
 * - Add delete buttons
 * - Add delete buttons location propType?
 * - Add githup site for presenting
 * - Should the initial values be null or an empty string?
 * - Write docs
 *
 * SPECIAL CASES
 *
 * Non-collectable:
 *
 * (Doesn't need a dataKey)
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

const getInitialValue = (inputType, propValue) => {
  if (['checkbox', 'radio'].indexOf(inputType) > -1) {
    return null
  } else {
    return null
  }
}

const getValue = (inputType, propValue, mappedValue) => {
  switch (inputType) {
    case 'checkbox':
    case 'button':
    case 'image': // Not tested
    case 'radio':
    case 'reset':
    case 'submit':
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

  componentWillMount = () => {
    const { data, children } = this.props
    if (data) this.setState({ dataValues: data })
    const initValues = (children, index) => {
      return React.Children.map(children, (child) => {
        const { dataKey, value} = child.props,
              inputType = child.props.type,
              isNotSubmit = (['button', 'image', 'reset', 'submit'].indexOf(inputType) == -1)
        if (child.type=='input'&&!dataKey) {
          // Note that child type is different than input type passed as prop
          // Print details about the child, to make it more easy to find
          console.warn('[react-repeater]:Input is missing dataKey. Data cannot be mapped to state properly. Please add dataKey prop to child element.')
        } else if (child.type=='input'&&isNotSubmit) {
          const nDataValues = [ ...this.state.dataValues ]
          nDataValues[index][dataKey] = getInitialValue(inputType, value )
        }
      })
    }
    for (let i = 0; this.state.dataValues.length > i; i++) {
      initValues(children, i)
    }
  }

  add = () => {
    this.setState({ dataValues: [ ...this.state.dataValues, {} ] })
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
              { dataKey, onChange } = propsCp
        propsCp.children = copyChildren(propsCp.children, index)
        // Check the case for arrays as well?
        if (child.type=='input'&&!dataKey) {
          console.warn('[react-repeater]:Input is missing dataKey. Data cannot be mapped to state properly. Please add dataKey prop to child element.')
        } else if (child.type=='input') {
          const inputType = propsCp.type,
                { value } = propsCp,
                nValue = getValue(inputType, value, dataValues[index][dataKey])
          propsCp.onChange = (e) => this.onChange(e, index, dataKey, inputType, onChange)
          propsCp.value = nValue
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