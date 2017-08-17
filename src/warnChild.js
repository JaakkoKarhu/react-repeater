import React from 'react'
import Children from 'react-children-utilities';

const warnChild = (children) => {
    React.Children.map(children, (child) => {
        if (typeof child == 'string')  return

        const { props, type } = child,
    		  { defaultProps, name } = type

        if (!!defaultProps&&defaultProps.bsClass) {
        	if (name=='Checkbox') {
        		console.log(props)
        	}
        	if (name=='Radio'&&typeof props.inputRef!='function') {
        		console.warn('It seems like you are using React-Bootstrap, but forgot to assign inputRef to the component. You need to use it to assign \'value\' property to the input. Otherwise React-Repeater does not know what to return...')
        	}
        	if (name=='Radio'&&typeof props.inputRef=='function') {
        		const holder = { }
        		props.inputRef(holder)
        		if (!holder.value) {
					console.warn(`Looks like you are using inputRef on React-Bootstrap component, but did not assign 'value\ property to the target component. You assigned the following keys instead: '${ Object.keys(holder) }' .Value is necessary for radios and checkboxes, otherwise React-Repeater does not know what to return to your data set!`)
        		}
        	}
        }
        warnChild(props.children)
    })
}

export default warnChild