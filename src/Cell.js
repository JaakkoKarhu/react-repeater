import React from 'react'
import Children from 'react-children-utilities';
import { isComp, isFunction} from './utils.js'

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
	getOnChange(rptKey, cb) {
		const { nDataValues } = this.state,
			  { onUpdate, index } = this.props
		return (e) => {
			console.log('CELL ON CHANGE')
			onUpdate(index, rptKey, e.target.value)
			if (isFunction(cb)) cb(e, nDataValues)
		}
	}
	componentWillMount() {
		const { children } = this.props
		this.assignOnChange(children)
	}
	assignOnChange(children) {
		const nChildren = React.Children.map(children, (child) => {
			const rptKey = child.props['data-rpt-key']
			if(isComp(child)) {
				const onChange = this.getOnChange(rptKey, child.props.onChange)
				const Child = rptHOC(child.type, { onChange })
				return <Child />
			}
			else {
				return child
			}
		})
		this.nChildren = nChildren
	}
	render() {
		const { nChildren } = this
		console.log(':::::: CELL ', this.props.index, 'UPDATED ::::::')
		return (
			<section>
				{ nChildren }
			</section>
		)
	}
}

export default Cell