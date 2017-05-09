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
      <h1>Repeater</h1>
      <Repeater collect={ collect }>
        <div className="repeater-input-row">
          <label for='sample-input'>
            Input:
          </label>
          <input dataKey='sample-input'
                 name='sample-input'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-input'>
            Button:
          </label>
          <input type='button'
                 name='sample-button'
                 dataKey='sample-button'
                 onChange={ onChange }
                 value='Button' />
        </div>
        <div className="repeater-input-row">
          <label for='sample-checkbox'>
            Checkbox:
          </label>
          <input type='checkbox'
                 dataKey='sample-checkbox'
                 name='sample-checkbox'
                 value='sample-checkbox-1'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-color'>
            Color:
          </label>
          <input type='color'
                 dataKey='sample-color'
                 name='sample-color'
                 value='#fc6548'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-date'>
            Date:
          </label>
          <input type='date'
                 name='sample-date'
                 dataKey='sample-date'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-datetime-local'>
            Datetime local:
          </label>
          <input type='datetime-local'
                 name='sample-datetime-local'
                 dataKey='sample-datetime-local'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label>
            Email:
          </label>
          <input type='email'
                 dataKey='sample-email'
                 name='sample-email'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-file'>
            File:
          </label>
          <input type='file'
                 dataKey='sample-file'
                 name='sample-file'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-hidden'>
            Hidden:
          </label>
          <input type='hidden'
                 dataKey='sample-hidden'
                 name='sample-hidden'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-image'>
            Image:
          </label>
          <input type='image'
                 dataKey='sample-image'
                 name='sample-image'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-month'>
            Month:
          </label>
          <input type='month'
                 dataKey='sample-month'
                 name='sample-month'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-number'>
            Number:
          </label>  
          <input type='number'
                 dataKey='sample-number'
                 name='sample-number'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-password'>
            Password:
          </label>
          <input type='password'
                 dataKey='sample-password'
                 name='sample-password'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-radio'>
            Radio:
          </label>
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
        </div>
        <div className="repeater-input-row">
          <label for='sample-range'>
            Range:
          </label>
          <input type='range'
                 dataKey='sample-range'
                 name='sample-range'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-reset'>
            Reset:
          </label>
          <input type='reset'
                 dataKey='sample-reset'
                 name='sample-reset'
                 value='Reset button'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-search'>
            Search:
          </label>
          <input type='search'
                 dataKey='sample-search'
                 name='sample-search'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-submit'>
            Submit:
          </label>
          <input type='submit'
                 dataKey='sample-submit'
                 name='sample-submit'
                 value='Submit button'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-tel'>
            Tel:
          </label>
          <input type='tel'
                 dataKey='sample-tel'
                 name='sample-tel'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-text'>
            Text:
          </label>
          <input type='text'
                 dataKey='sample-text'
                 name='sample-text'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-time'>
            Time:
          </label>
          <input type='time'
                 dataKey='sample-time'
                 name='sample-time'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-url'>
            Url:
          </label>
          <input type='url'
                 dataKey='sample-url'
                 name='sample-url'
                 onChange={ onChange } />
        </div>
        <div className="repeater-input-row">
          <label for='sample-week'>
            Week:
          </label>
          <input type='week'
                 dataKey='sample-week'
                 name='sample-week'
                 onChange={ onChange } />
        </div>
      </Repeater>
    </div>
  </section>
);

export default App;
