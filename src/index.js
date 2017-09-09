/*
 * TODO
 *
 * - Investigate the radio button changes all values on change bug
 * - Fix BS not changing the value on change bug (OF WHAT??)
 * - Write warning, if inputRef not set on BS radio
 * - Support select and select multiple
 * - Troubleshoot bootstrap radio and checkbox <-- means when tabs?
 * - Don't assign empty values to returned data
 * - Add validation rule proptype/callback?
 * - Nested repeater
 * - Handle content change
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
import { isComp, isFunction, isMappable, mapModel } from './utils.js'

class Repeater extends React.Component {
  static propTypes = {
    collect: PropTypes.func,
    data: PropTypes.array,
    onAdd: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      model: null
    }
  }

  componentWillMount() {
    const { data } = this.props
    this.init(data)
  }

  componentDidMount() { console.log('INITIAL STATE', this.state) }

  init = (data=[{}]) => {
    const { children, onUpdate } = this.props,
          nData = [],
          model = mapModel(children)
    for (let i=0; data.length > i; i++) {
      nData.push({ ...model, ...data[i] })
    }
    this.setState({ model }, () => {
      onUpdate(nData)
    })
  }

  onCellUpdate(i, key, val) {
    const { onUpdate, data } = this.props
    const nData = [ ...data]
    console.log('i, key, val', i, key, val)
    nData[i] = { ...nData[i], [key]: val}
    onUpdate(nData)
  }

  getCells = () => {
    const { children, data } = this.props,
          { onCellUpdate } = this,
          elems = []
    for (let i = 0; data.length > i; i++) {
      elems.push(
        <Cell cellValues={ data[i] }
              index={ i }
              onUpdate={ onCellUpdate.bind(this) }>
          { children }
        </Cell>
      )
    }
    return elems
  }

  onAdd = (index) => {
    console.log('onADD')
    const { data, onUpdate } = this.props
    const nData = [ ...data ]
    nData.splice(index, 0, {})
    onUpdate(nData)
    console.log('THIS STATE AFTER ADD', this.state)
  }

  render() {
    const { onAdd } = this,
          { data } = this.props
    return (
      <div className={ `repeater` }>
        { this.getCells() }
        <div className={ `repeater-add` } // Convert to button
             onClick={ () => onAdd(data.length) } />
      </div>
    )
  }
}

Repeater.defaultProps = {
  data: [{}],
  onUpdate: () => {}
}

export default Repeater