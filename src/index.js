/*
 * TODO
 *
 * - Duplicate elements
 * - Recognise input
 * - Return input value for parent
 *
 */

import PropTypes from 'prop-types'
import React from 'react'

class Repeater extends React.Component {
  static propTypes = {

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

  getElems = () => {
    const { dataValues } = this.state,
          elems = [],
          { props } = this
    const copyChildren = (children) => {
      return React.Children.map(children, (child) => {
        let propsCp = { ...child.props }
        propsCp.children = copyChildren(propsCp.children)
        // Check the case for arrays as well?
        return child.type
               ? React.createElement(child.type, { ...propsCp } )
               : child
      })
    }
    for (let i = 0; dataValues.length > i; i++) {
      let elem = copyChildren(props.children)
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