import AllInputs from './examples/AllInputs.js'
import React from 'react'
import Repeater from '../../src'
import './style.css'
import './presentation.css'
import {
  HashRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'

const isActive = (location, pathname) => {
  return location.pathname==pathname
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
   let { view } = this.state
    return (
      <Router>
        <section>
          <div className='presentation-sidebar'>
            <ul>
              <li>
                <NavLink to='all-inputs'
                       isActive={(m, loc) => isActive(loc, '/all-inputs')}
                       activeClassName='active'>
                  All inputs
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='presentation-content'>
            <Route path='/all-inputs' component={ AllInputs } />
          </div>
        </section>
      </Router>
    );
  }
};

export default App;
