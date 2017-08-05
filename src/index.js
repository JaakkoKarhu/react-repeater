/*
 * TODO
 * 
 * - Fix the radio button bug on examples
 * - Add validation rule proptype/callback?
 * - Nested repeater
 * - Complex conditional repeater?
 * - Test: two inputs of a same type
 * - With Bootstrap
 * - Callback
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

import Cell from './Cell.js'
import PropTypes from 'prop-types'
import React from 'react'
import { isComp, isFunction, isMappable, getInitialValue } from './utils.js'

class Repeater extends React.Component {
  static propTypes = {
    collect: PropTypes.func,
    data: PropTypes.array,
    onAdd: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      dataValues: [{}]
    }
  }

  componentWillMount = () => {
    const { data } = this.props
    this.init(data)
  }

  init = (data=[{}]) => {
    const { children } = this.props
    /*const initDataValues = []
    for (let i=0; data.length > i; i++) {
      const emptyValues = this.mapCellModel(i)
      console.log('emptyValues', emptyValues)
      initDataValues.push({ ...emptyValues, ...data[i] })
    }
    this.setState({ dataValues: initDataValues })
    */
    const model = this.mapCellModel(children) 
    console.log('MODEL', model)
  }

  mapCellModel = (children=this.props.children, model={}) => {
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
      } else if (isMappable(child.type)&&isNotSubmit||isComp(child)) {
        nModel[rptKey] = getInitialValue(inputType, value, checked )
      }
      if (propsCp.children) {
        nModel = this.mapCellModel(propsCp.children, nModel)
      }
    })

    return { ...model, ...nModel}
  }

  getElems = () => {
    const { dataValues } = this.state,
          { children } = this.props,
          elems = []
    for (let i = 0; dataValues.length > i; i++) {
      elems.push(<Cell cellValues={ dataValues[i] }>{ children }</Cell>)
    }
    return elems
  }

  onAdd = (index) => {
    console.log('onADD')
    const nDataValues = [ ...this.state.dataValues ]
    nDataValues.splice(index, 0, {})
    this.setState({
      dataValues: nDataValues
    })
  }

  render() {
    const { onAdd } = this,
          { dataValues } = this.state
    return (
      <div className={ `repeater` }>
        { this.getElems() }
        <div className={ `repeater-add` } // Convert to button
             onClick={ () => onAdd(dataValues.length) } />
      </div>
    )
  }
}

export default Repeater