import React from 'react'
import Repeater from '../../../src'
import getIntendedJSON from '../utilities/getIntendedJSON'

class BirthdDayParticipants extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: '{}'
    }
  }

  onChange = (e, data) => this.setState({ data })

  onAdd = (data) => this.setState({ data })

  render() {
    const { onChange, onAdd } = this
    return (
      <section>
        <h1>Birthday participants</h1>
        <div className='presentation-section-50'>
          <Repeater onAdd={ onAdd }>
            <div className='repeater-input-row'>
              <input data-rpt-key='guest-name'
                     onChange={ onChange } />
            </div>
            <div className='repeater-delete'
                 data-rpt-delete={ true } />
          </Repeater>
        </div>
        <div className='presentation-section-50'>
          <h2>Returns:</h2>
          <div className='presentation-well-json'>
            {
              getIntendedJSON(this.state.data)
            }
          </div>
        </div>
      </section>
    )
  } 
}

export default BirthdDayParticipants