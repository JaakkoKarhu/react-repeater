import React from 'react'
import Repeater from '../../../src'

const nameValidation = (cellData, type) => {
  const validatedName = cellData['pet-name']
  if (validatedName!=null&&validatedName.length>7) {
    return type=='errorText' 
           ? { children: 'Oh, your pet has a way too long name :(' }
           : { 'data-has-error': true }
  } else {
    return type=='errorText' 
           ? { children: '' }
           : { 'data-has-error': false}
  }
}

class SimpleValidation extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <section>
        <h1>Simple validation</h1>
        <div className='presentation-section-50'>
          <Repeater>
            <div className='repeater-cell'>
              <div className='repeater-input-row'
                   data-rpt-validation={ (cellData) => nameValidation(cellData, 'hasError') } >
                <label htmlFor='pet-name'>
                  Name of your pet:
                </label>
                <input data-rpt-key='pet-name'/>
                <div className='repeater-error'
                     data-rpt-validation={ (cellData) => nameValidation(cellData, 'errorText') } />
              </div>
            </div>
          </Repeater>
        </div>
      </section>
    )
  }
}

export default SimpleValidation