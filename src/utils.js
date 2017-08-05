const isComp = (t) => {
  return typeof t.type=='function'
}

const isFunction = (f) => {
  const getType = {}
  return f && getType.toString.call(f) === '[object Function]'
}

const isMappable = (t) => {
  return t=='input'||t=='textarea'
}

const getInitialValue = (inputType, propValue, checked) => {
  if (['checkbox', 'radio'].indexOf(inputType) > -1) {
    return checked ? propValue : null
  } else {
    return propValue || null
  }
}

exports.isComp = isComp
exports.isFunction = isFunction
exports.getInitialValue = getInitialValue
exports.isMappable = isMappable