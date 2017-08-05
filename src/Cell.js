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
	getOnChange(cb) {
		const { nDataValues } = this.state
		return (e) => {
			console.log('CELL ON CHANGE')
			if (isFunction(cb)) cb(e, nDataValues)
		}
	}
	componentWillMount() {
		const { children } = this.props
		this.assignOnChange(children)
	}
	assignOnChange(children) {
		console.log('ASSIGN ON CHANGE')
		const nChildren = React.Children.map(children, (child) => {
			if(isComp(child)) {
				const onChange = this.getOnChange(child.props.onChange)
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
		return (
			<section>
				{ nChildren }
			</section>
		)
	}
}

export default Cell