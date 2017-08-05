import React from 'react'
import Children from 'react-children-utilities';
import { isComp, isFunction, isMappable, isNotSubmit } from './utils.js'

const rptHOC = (Target, nProps) => {
  return class extends React.Component {
    constructor(props) {
      super(props)
    }
    render() {
     	return <Target { ...{ ...this.props, ...nProps } } />
    }
  }
} 

class Cell extends React.Component {
	constructor(props) {
		super(props)
		this.nChildren = undefined
		this.state = {}
	}
	shouldComponentUpdate(nP) {
		const { cellValues } = this.props,
			  cellValuesDiff = (JSON.stringify(cellValues)!==JSON.stringify(nP.cellValues))
		if (cellValuesDiff) {
			return true
		} else {
			return false
		}
	}
	getOnChange(rptKey, cb, type) {
		const { onUpdate, index } = this.props
		console.log('RPTKEY', rptKey)
		return (e) => {
			console.log('TYPE', type)
			onUpdate(index, rptKey, e.target.value)
			if (isFunction(cb)) cb(e)
		}
	}
	componentWillMount() {
		const { children } = this.props
		this.nChildren = this.assignOnChange(children)
	}
	assignOnChange(children) {
		return React.Children.map(children, (child) => {
			const rptKey = child.props['data-rpt-key'],
				  isNotSubmit = (['button', 'image', 'reset', 'submit'].indexOf(child.props.type) == -1)
			if(isComp(child)) {
				const onChange = this.getOnChange(rptKey, child.props.onChange)
				const Child = rptHOC(child.type, { onChange })
				return { component: Child, props: child.props }
			}// These two conditionals could be combined. Only change is assigning onChange
			else if (isMappable(child.type)&&isNotSubmit) {
				const __nChildren = this.assignOnChange(child.props.children)
				return React.cloneElement(child, { ...child.props, onChange: this.getOnChange(rptKey, undefined, child.type) }, __nChildren)
			} else {
				const __nChildren = this.assignOnChange(child.props.children)
				return React.cloneElement(child, { ...child.props }, __nChildren)
			}
		})
	}

	getChildren() {
		const { cellValues } = this.props
		const elems = this.nChildren.map((child) => {
			if (typeof child == 'object'&&child.component) {
				const rptkey = child.props['data-rpt-key']
				const Child = child.component,
					  value = cellValues[rptkey]
				return <Child { ...{ ...child.props, value } }/>
			} else {
				return child
			}
		})
		return elems
	}
	render() {
		const { nChildren } = this
		console.log(':::::: CELL ', this.props.index, 'UPDATED ::::::')
		return (
			<section>
				{ this.getChildren() }
			</section>
		)
	}
}

export default Cell