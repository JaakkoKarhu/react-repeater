import React from 'react'
import Repeater from '../../../src'

const nameValidation = (cellData) => {
  const validatedName = cellData['validated-name']
  if (validatedName!=null&&validatedName.length>2) {
    return 'Text is too long'
  } else {
    return ''
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
            <div className='repeater-input-row'>
              <div className='error'
                   data-rpt-validation={ { children: nameValidation } } />
              <input data-rpt-key='validated-name'/>
            </div>
          </Repeater>
        </div>
      </section>
    )
  }
}

export default SimpleValidation