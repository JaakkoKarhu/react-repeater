import React from 'react'

const getIntendedJSON = (data=[{}]) => {
const splitted = JSON.stringify(data, null, '--').split('--')
let arr = []

for(var a=0; a < splitted.length; a++) {
    let str = splitted[a]
    if(!!str) arr.push(<span>{str}</span>, <br />)
        if(a!=splitted.length-1) arr.push('\u00a0\u00a0')
    }
    console.log('ARR', arr)
    return arr
}

export default getIntendedJSON