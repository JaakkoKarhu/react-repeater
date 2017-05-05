import React from 'react'
import Repeater from '../../src'

const collect = (data) => {
  console.log('App.js', 'This is the collected data:', data);
}

const onChange = (e, data) => {
  // console.log('App.js', '-->', e.target.value, data);
}
const value = 'This is mapped value.'
const App = () => (
  /* Non-standard dom attributes are stripped away from inputs in
   * Repeater
   */
  <div>
    <Repeater collect={ collect }>
      <h3>Repeated text</h3>
      <input dataKey='sample-data'
             onChange={ onChange } />
    </Repeater>
  </div>
);

export default App;
