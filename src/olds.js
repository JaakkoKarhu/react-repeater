/*


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

*/

/*

  init = (i = 0) => {
    const { children } = this.props
    for (i; this.state.dataValues.length > i; i++) {
      this.mapEmptyValuesToCell(i)
    }
  }

*/

/*
    // getElemes
    const { dataValues } = this.state,
          elems = [], 
          { props } = this
    const copyChildren = (children, index) => {
      return React.Children.map(children, (child) => {
        const propsCp = { ...child.props },
              { onChange, onClick } = propsCp,
              rptKey = propsCp['data-rpt-key'],
              isDelete = propsCp['data-rpt-delete'],
              isAddAbove = propsCp['data-rpt-add-above'],
              isAddBelow = propsCp['data-rpt-add-below'],
              validation = propsCp['data-rpt-validation'],
              inputType = propsCp.type,
              isNotSubmit = (['button', 'image', 'reset', 'submit'].indexOf(inputType) == -1),
              isToggle = (['checkbox', 'radio'].indexOf(inputType) > -1)
        propsCp.children = copyChildren(propsCp.children, index)
        // Check the case for arrays as well?
        if (isMappable(child.type)&&isNotSubmit&&!rptKey) {
          console.warn('[react-repeater]:Input is missing data-rpt-key. Data cannot be mapped to state properly. Please add rptKey prop to child element.')
        } else if (isMappable(child.type)&&isNotSubmit||isComp(child)) {
          //console.log('ON CHANGE')
          const { value } = propsCp,
                nValue = getValue(inputType, value, dataValues[index][rptKey])
          propsCp.onChange = (e) => this.onChange(e, index, rptKey, inputType, onChange)
          propsCp.value = nValue
        } else if (isDelete) {
          propsCp.onClick = (e) => this.onDelete(e, index, onClick)
        }

        // Add ne group
        if (isAddAbove)  propsCp.onClick = () => this.onAdd(index) 
        if (isAddBelow)  propsCp.onClick = () => this.onAdd(index+1)

        // Needs comments
        if (validation) {
          for(let prop in validation) {
            const cb = validation[prop],
                  cellData = dataValues[index]
            if(isFunction(cb)) propsCp[prop] = cb(cellData)
          }
        }
        // Check if radio||checkbox should be checked according to passed data
        if (isToggle&&dataValues[index][rptKey]===propsCp.value) {
          propsCp.checked = true
        } else {
          propsCp.checked = false
        }
        //console.log('Child prototype', child.type.prototype)
        if (child.type) {
          // Check if element or component
          //console.log('-->>', child.type.prototype, typeof child.type=='function')
          if (isComp(child)) {
            //console.log('----->>')
            const Child = rptHOC(child.type, propsCp)
            return <Child />
          } else {
            return React.createElement(child.type, { ...propsCp } )
          }
        } else {
          return child
        }
      })
    }
    for (let i = 0; dataValues.length > i; i++) {
      let elem = copyChildren(props.children, i)
      elems.push(elem)
    }
    return elems
*/
/*
  componentWillMount = () => {
    const { data } = this.props
    if (data) this.setState({ dataValues: data })
    this.init()
  }

  onAdd = (index) => {
    const { onAdd } = this.props,
          nDataValues = [ ...this.state.dataValues ]
    const afterSetState = () => {
      const { dataValues } = this.state
      this.mapEmptyValuesToCell(index)
      if (isFunction(onAdd)) onAdd(dataValues)
    }
    nDataValues.splice(index, 0, {})
    this.setState(
    {
      dataValues: nDataValues
    }, afterSetState)
  }

  onChange = (e, index, rptKey, inputType, cb) => {
    /* Make switch statement here to check the type,
     * store input value accordingly
     *
     */
     /*
    const nDataValues = [ ...this.state.dataValues ]
    if (inputType=='checkbox'&&!e.target.checked) {
      nDataValues[index][rptKey] = ''
    } else {
      nDataValues[index][rptKey] = e.target.value // Assign here instead of reading the e directly
    }
    this.setState({ dataValues: nDataValues })
    if (isFunction(cb)) cb(e, nDataValues)
  }

  onDelete = (e, index, cb) => {
    const nDataValues = [ ...this.state.dataValues ]
    nDataValues.splice(index, 1)
    this.setState({ dataValues: nDataValues })
    if (isFunction(cb)) cb(e, nDataValues)
  }

*/  