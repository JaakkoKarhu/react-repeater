import React from 'react'
import Repeater from '../../src'
import './style.css'
import './presentation.css'

const collect = (data) => {
  console.log('App.js', 'This is the collected data:', data);
}

const onChange = (e, data) => {
  console.log('App.js', '-->', e.target.value, data);
}

const App = () => (
  /* Non-standard dom attributes are stripped away from inputs in
   * Repeater
   */
  <section>
    <div className='presentation-sidebar'>
    </div>
    <div className='presentation-content'>
      <Repeater collect={ collect }>
        <h1>Repeater</h1>
        <input dataKey='sample-input'
               onChange={ onChange } />
        <span>
          <input dataKey='sample-nested-input'
                 onChange={ onChange } />
        </span>
        <input type='button'
               dataKey='sample-button'
               onChange={ onChange }
               value='Button' />
        <input type='checkbox'
               dataKey='sample-checkbox'
               value='sample-checkbox-1'
               onChange={ onChange } />
        <input type='color'
               dataKey='sample-color'
               value='#fc6548'
               onChange={ onChange } />
        <input type='date'
               dataKey='sample-date'
               onChange={ onChange } />
        <input type='datetime-local'
               dataKey='sample-datetime-local'
               onChange={ onChange } />
        <input type='email'
               dataKey='sample-email'
               onChange={ onChange } />
        <input type='file'
               dataKey='sample-file'
               onChange={ onChange } />
        <input type='hidden'
               dataKey='sample-hidden'
               onChange={ onChange } />
        <input type='image'
               dataKey='sample-image'
               onChange={ onChange } />
        <input type='month'
               dataKey='sample-month'
               onChange={ onChange } />
        <input type='number'
               dataKey='sample-number'
               onChange={ onChange } />
        <input type='password'
               dataKey='sample-password'
               onChange={ onChange } />
        <input type='radio'
               name='sample-radio'
               dataKey='sample-radio'
               value='sample-radio-1'
               onChange={ onChange } />
        <input type='radio'
               name='sample-radio'
               checked
               dataKey='sample-radio'
               value='sample-radio-2'
               onChange={ onChange } />
        <input type='range'
               dataKey='sample-range'
               onChange={ onChange } />
        <input type='reset'
               dataKey='sample-reset'
               value='Reset button'
               onChange={ onChange } />
        <input type='search'
               dataKey='sample-search'
               onChange={ onChange } />
        <input type='submit'
               dataKey='sample-submit'
               value='Submit button'
               onChange={ onChange } />
        <input type='tel'
               dataKey='sample-tel'
               onChange={ onChange } />
        <input type='text'
               dataKey='sample-text'
               onChange={ onChange } />
        <input type='time'
               dataKey='sample-time'
               onChange={ onChange } />
        <input type='url'
               dataKey='sample-url'
               onChange={ onChange } />
        <input type='week'
               dataKey='sample-week'
               onChange={ onChange } />
      </Repeater>
    </div>
  </section>
);

export default App;
