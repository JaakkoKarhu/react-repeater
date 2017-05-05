import React from 'react'
import Repeater from '../../src'

const collect = (data) => {
  console.log('App.js', 'This is the collected data:', data);
}

const App = () => (
  <div>
    <Repeater collect={ collect }>
      <h3>Repeated text</h3>
      <input dataKey='sample-data' />
    </Repeater>
  </div>
);

export default App;
