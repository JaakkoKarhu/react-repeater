/*
 * TODO
 *
 * - Return input value for parent
 * - Test: default render
 * - Test: all types of nested children
 * - Test: return data to collect method
 * - Test: passing down data as props will render it
 */


const isFunction = (f) => {
  const getType = {}
  return f && getType.toString.call(f) === '[object Function]'
}

import PropTypes from 'prop-types'
import React from 'react'

class Repeater extends React.Component {
  static propTypes = {
    collect: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      dataValues: [{}]
    }
  }

  add = () => {
    this.setState({ dataValues: [ ...this.state.dataValues, {} ] })
  }

  onChange = (e, index, dataKey, cb) => {
    const nDataValues = [ ...this.state.dataValues ]
    nDataValues[index][dataKey] = e.target.value
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
        propsCp.children = copyChildren(propsCp.children)
        // Check the case for arrays as well?
        if (child.type=='input'&&!dataKey) {
          console.warn('[react-repeater]:Input is missing dataKey. Data cannot be mapped to state properly. Please add dataKey prop to child element.')
        } else if (child.type=='input') {
          propsCp.onChange = (e) => this.onChange(e, index, dataKey, onChange)
          propsCp.value = dataValues[index][dataKey] || ''
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