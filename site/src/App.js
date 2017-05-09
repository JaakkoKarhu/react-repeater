import React from 'react'
import Repeater from '../../src'
import './style.css'
import './presentation.css'

const getIntendedJSON = (data) => {
  const splitted = JSON.stringify(data, null, '--').split('--')
  let arr = []

  for(var a=0; a < splitted.length; a++) {
    let str = splitted[a]
    if(!!str) arr.push(<span>{str}</span>, <br />)
    if(a!=splitted.length-1) arr.push('\u00a0\u00a0')
  }
  return arr

  //let arr2 = []

  // for(var i=0; i < arr.length-1; i++ ) {
  //   let str = arr[i]
  //   if (str=='--'&&arr[i-1]=='--') {
  //     arr2[arr2.length-1] = arr2[arr2.length-1] + '--'
  //   } else if (arr[i-1]=='--') {
  //     arr2[arr2.length-1] = arr2[arr2.length-1] + str
  //   } else {
  //     arr2.push(str)
  //   }
  // } 
}

class AllInputsExample extends React.Component {

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
        <h1>Repeater</h1>
        <div className="presentation-section-50">
          <Repeater>
            <div className="repeater-input-row">
              <label htmlFor='sample-input'>
                Input:
              </label>
              <input dataKey='sample-input'
                     name='sample-input'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-input'>
                Button:
              </label>
              <input type='button'
                     name='sample-button'
                     dataKey='sample-button'
                     onChange={ onChange }
                     value='Button' />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-checkbox'>
                Checkbox:
              </label>
              <input type='checkbox'
                     dataKey='sample-checkbox'
                     name='sample-checkbox'
                     value='sample-checkbox-1'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-color'>
                Color:
              </label>
              <input type='color'
                     dataKey='sample-color'
                     name='sample-color'
                     value='#fc6548'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-date'>
                Date:
              </label>
              <input type='date'
                     name='sample-date'
                     dataKey='sample-date'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-datetime-local'>
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
              <label htmlFor='sample-file'>
                File:
              </label>
              <input type='file'
                     dataKey='sample-file'
                     name='sample-file'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-hidden'>
                Hidden:
              </label>
              <input type='hidden'
                     dataKey='sample-hidden'
                     name='sample-hidden'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-image'>
                Image:
              </label>
              <input type='image'
                     dataKey='sample-image'
                     name='sample-image'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-month'>
                Month:
              </label>
              <input type='month'
                     dataKey='sample-month'
                     name='sample-month'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-number'>
                Number:
              </label>  
              <input type='number'
                     dataKey='sample-number'
                     name='sample-number'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-password'>
                Password:
              </label>
              <input type='password'
                     dataKey='sample-password'
                     name='sample-password'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-radio'>
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
              <label htmlFor='sample-range'>
                Range:
              </label>
              <input type='range'
                     dataKey='sample-range'
                     name='sample-range'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-reset'>
                Reset:
              </label>
              <input type='reset'
                     dataKey='sample-reset'
                     name='sample-reset'
                     value='Reset button'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-search'>
                Search:
              </label>
              <input type='search'
                     dataKey='sample-search'
                     name='sample-search'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-submit'>
                Submit:
              </label>
              <input type='submit'
                     dataKey='sample-submit'
                     name='sample-submit'
                     value='Submit button'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-tel'>
                Tel:
              </label>
              <input type='tel'
                     dataKey='sample-tel'
                     name='sample-tel'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-text'>
                Text:
              </label>
              <input type='text'
                     dataKey='sample-text'
                     name='sample-text'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-time'>
                Time:
              </label>
              <input type='time'
                     dataKey='sample-time'
                     name='sample-time'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-url'>
                Url:
              </label>
              <input type='url'
                     dataKey='sample-url'
                     name='sample-url'
                     onChange={ onChange } />
            </div>
            <div className="repeater-input-row">
              <label htmlFor='sample-week'>
                Week:
              </label>
              <input type='week'
                     dataKey='sample-week'
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

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      view: 'AllInputsExample'
    }
  }

  getView = (view) => {
    switch(view) {
      case 'AllInputsExample':
        return <AllInputsExample />
      break;
      default:
        return <h1>Please select view</h1>
    }
  }

  render() {
   let { view } = this.state
    return (
      <section>
        <div className='presentation-sidebar'>
          <ul>
            <li className={ view=='AllInputsExample' ? 'active' : '' }>
              All inputs
            </li>
          </ul>
        </div>
        <div className='presentation-content'>
          {
            this.getView(view)
          }
        </div>
      </section>
    );
  }
};

export default App;
