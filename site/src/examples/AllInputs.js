import React from 'react'
import Repeater from '../../../src'
import getIntendedJSON from '../utilities/getIntendedJSON'

class AllInputs extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: '{}'
    }
  }

  onChange = (e, data) => {
    this.setState({
      data
    })
  }

  render() {
    const { onChange } = this
    return (
      <section>
        <h1>All possible inputs</h1>
        <div className="presentation-section-50">
          <Repeater>
            <div className='repeater-input-row'>
              <label htmlFor='sample-input'>
                Input:
              </label>
              <input data-rpt-key='sample-input'
                     name='sample-input'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-input'>
                Button:
              </label>
              <input type='button'
                     name='sample-button'
                     onChange={ onChange }
                     value='Button' />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-checkbox'>
                Checkbox:
              </label>
              <input type='checkbox'
                     data-rpt-key='sample-checkbox'
                     name='sample-checkbox'
                     value='sample-checkbox-1'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-color'>
                Color:
              </label>
              <input type='color'
                     data-rpt-key='sample-color'
                     name='sample-color'
                     value='#fc6548'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-date'>
                Date:
              </label>
              <input type='date'
                     name='sample-date'
                     data-rpt-key='sample-date'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-datetime-local'>
                Datetime local:
              </label>
              <input type='datetime-local'
                     name='sample-datetime-local'
                     data-rpt-key='sample-datetime-local'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label>
                Email:
              </label>
              <input type='email'
                     data-rpt-key='sample-email'
                     name='sample-email'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-file'>
                File:
              </label>
              <input type='file'
                     data-rpt-key='sample-file'
                     name='sample-file'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-hidden'>
                Hidden:
              </label>
              <input type='hidden'
                     data-rpt-key='sample-hidden'
                     name='sample-hidden'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-image'>
                Image:
              </label>
              <input type='image'
                     name='sample-image'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-month'>
                Month:
              </label>
              <input type='month'
                     data-rpt-key='sample-month'
                     name='sample-month'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-number'>
                Number:
              </label>  
              <input type='number'
                     data-rpt-key='sample-number'
                     name='sample-number'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-password'>
                Password:
              </label>
              <input type='password'
                     data-rpt-key='sample-password'
                     name='sample-password'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-radio'>
                Radio:
              </label>
              <input type='radio'
                     name='sample-radio'
                     data-rpt-key='sample-radio'
                     value='sample-radio-1'
                     onChange={ onChange } />
              <input type='radio'
                     name='sample-radio'
                     checked
                     data-rpt-key='sample-radio'
                     value='sample-radio-2'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-range'>
                Range:
              </label>
              <input type='range'
                     data-rpt-key='sample-range'
                     name='sample-range'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-reset'>
                Reset:
              </label>
              <input type='reset'
                     name='sample-reset'
                     value='Reset button'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-search'>
                Search:
              </label>
              <input type='search'
                     data-rpt-key='sample-search'
                     name='sample-search'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-submit'>
                Submit:
              </label>
              <input type='submit'
                     name='sample-submit'
                     value='Submit button'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-tel'>
                Tel:
              </label>
              <input type='tel'
                     data-rpt-key='sample-tel'
                     name='sample-tel'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-text'>
                Text:
              </label>
              <input type='text'
                     data-rpt-key='sample-text'
                     name='sample-text'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label>
                Textarea element (not a type):
              </label>
              <textarea data-rpt-key='sample-textarea'
                        name='sample-textarea'
                        onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-time'>
                Time:
              </label>
              <input type='time'
                     data-rpt-key='sample-time'
                     name='sample-time'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-url'>
                Url:
              </label>
              <input type='url'
                     data-rpt-key='sample-url'
                     name='sample-url'
                     onChange={ onChange } />
            </div>
            <div className='repeater-input-row'>
              <label htmlFor='sample-week'>
                Week:
              </label>
              <input type='week'
                     data-rpt-key='sample-week'
                     name='sample-week'
                     onChange={ onChange } />
            </div>
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
    );
  }
}

export default AllInputs