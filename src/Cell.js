/* TODO:
 *
 * Render nested components, intputs, whatever
 * Assign mapped value to normal input
 * Don't assign onChange, if no repeater key?
 */

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

			if(typeof child == 'string') {
				return child
			}

			const rptKey = child.props['data-rpt-key'],
				  isNotSubmit = (['button', 'image', 'reset', 'submit'].indexOf(child.props.type) == -1)
			const nGrandChildren = this.assignOnChange(child.props.children)
			if(isComp(child)) {
				const onChange = this.getOnChange(rptKey, child.props.onChange)
				const Child = rptHOC(child.type, { onChange })
				// Store object HOC to this to avoid HOCcing on render
				return { component: Child, props: { ...child.props, children: nGrandChildren } }
			}// These two conditionals could be combined. Only change is assigning onChange
			else if (isMappable(child.type)&&isNotSubmit) {
				// Store to object, like with component, in here?
				return React.cloneElement(child, { ...child.props, onChange: this.getOnChange(rptKey, undefined, child.type) }, nGrandChildren)
			} else {
				return React.cloneElement(child, { ...child.props }, nGrandChildren)
			}
		})
	}

	getChildren(children) {
		const { cellValues } = this.props
		const elems = children.map((child) => {
			if (typeof child == 'object'&&child.component) {
				const rptkey = child.props['data-rpt-key']
				const Child = child.component,
					  value = cellValues[rptkey] || ''
					  // clear this terniary
					  const __children = child.props.children
					   ? this.getChildren(child.props.children)
					   : child.props.children
				return <Child { ...{ ...child.props, children: __children, value } }/>
			} else {
				// Error caused here because of the component inside div, which is
				// still an object. To clear the logic, convert assignOnChange()
				// to always store the children in to object, and then reassign here
				console.log('CHILD', children)
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
				{ this.getChildren(nChildren) }
			</section>
		)
	}
}

export default Cell