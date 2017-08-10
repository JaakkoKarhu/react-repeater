/* TODO:
 *
 * Assign mapped value to normal input
 * Don't assign onChange, if no repeater key?
 * Fix undefined key on model mapping
 * Implement special input support
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

	/* Everytime children are 'initialised', this should
	 * be called.
	 */
	assignOnChange(children) {
		return React.Children.map(children, (child) => {

			if(typeof child == 'string') {
				return { string: child }
			}

			const rptKey = child.props['data-rpt-key'],
				  isNotSubmit = (['button', 'image', 'reset', 'submit'].indexOf(child.props.type) == -1)
			const nGrandChildren = this.assignOnChange(child.props.children)
			if(isComp(child)) {
				const onChange = this.getOnChange(rptKey, child.props.onChange)
				const Child = rptHOC(child.type, { onChange })
				// Store object HOC to this to avoid HOCcing on render
				return {
					component: Child,
					props: child.props,
					children: nGrandChildren
				}
			}// These two conditionals could be combined. Only change is assigning onChange
			else if (isMappable(child.type)&&isNotSubmit) {
				// Store to object, like with component, in here?
				// return React.cloneElement(child, { ...child.props, onChange: this.getOnChange(rptKey, undefined, child.type) }, nGrandChildren)
				return {
					element: child,
					props: {
						...child.props,
						onChange: this.getOnChange(rptKey, undefined, child.type)
					},
					children: nGrandChildren
				}
			} else {
				//return React.cloneElement(child, { ...child.props }, nGrandChildren)
				return {
					element: child,
					props: child.props,
					children: nGrandChildren
				}
			}
		})
	}

	getChildren(children) {
		const { cellValues } = this.props
		const elems = children.map((childObj) => {
			const getGrandChildren = (cn) => {
				return cn
					   ? this.getChildren(cn)
					   : undefined
			}
			const isChildObj = typeof childObj == 'object'
			if (isChildObj&&childObj.component) {
				const rptkey = childObj.props['data-rpt-key']
				const Child = childObj.component,
					  value = cellValues[rptkey] || ''
				const grandChildren = getGrandChildren(childObj.children)
				return <Child { ...{ ...childObj.props, children: grandChildren, value } }/>
			} else if (isChildObj&&childObj.element) {
				const grandChildren = getGrandChildren(childObj.children)
				return React.cloneElement(childObj.element, childObj.props, grandChildren)
			} else if (isChildObj&&childObj.string) {
				return childObj.string
			} else {
				console.warn('Uh-oh. Seems like the childObj was not properly initialised. This should never happen. You have a bug in your system.')
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