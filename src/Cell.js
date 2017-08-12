/* TODO:
 *
 * Assign mapped value to normal input
 * Don't assign onChange, if no repeater key?
 * Fix undefined key on model mapping
 * Implement special input support
 */

import React from 'react'
import Children from 'react-children-utilities';
import {
    isComp,
    isFunction,
    isMappable,
    isNotSubmit,
    isSpecialType,
    getPropValueForSpecial,
    getSpecialOnChangeValue,
} from './utils.js'

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
    componentWillMount() {
        const { children } = this.props
        this.nChildren = this.assignOnChange(children)
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
            const value = getSpecialOnChangeValue(e)
            onUpdate(index, rptKey, value)
            if (isFunction(cb)) cb(e)
        }
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
                console.log('IS MAPPABLE', child.props.type)
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
                const rptkey = childObj.props['data-rpt-key'],
                      Child = childObj.component,
                      value = cellValues[rptkey] || '',
                      grandChildren = getGrandChildren(childObj.children)
                return <Child { ...{ ...childObj.props, children: grandChildren, value } }/>
            } else if (isChildObj&&childObj.element) {
                const rptkey = childObj.props['data-rpt-key'],
                      { type, value } = childObj.props,
                      grandChildren = getGrandChildren(childObj.children)
                let nProps = { ...childObj.props }
                      if (isSpecialType(type)) {
                        const modProps = getPropValueForSpecial(type, value, cellValues[rptkey], rptkey)
                        console.log('MOD PROPS', modProps)
                        nProps = { ...nProps, ...modProps}
                      }
                return React.cloneElement(childObj.element, nProps, grandChildren)
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
        //console.log(':::::: CELL ', this.props.index, 'UPDATED ::::::')
        return (
            <section>
                { this.getChildren(nChildren) }
            </section>
        )
    }
}

export default Cell