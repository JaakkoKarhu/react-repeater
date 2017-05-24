import AllInputs from './examples/AllInputs'
import BirthdayPartyParticipants from './examples/BirthdayPartyParticipants'
import React from 'react'
import Repeater from '../../src'
import SimpleValidation from './examples/SimpleValidation'
import WithBootstrap from './examples/WithBootstrap'
import {
  HashRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import './presentation.css'
import './style.css'

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
              <li>
                <NavLink to='birthday-party-participants'
                         isActive={(m, loc) => isActive(loc, '/birthday-party-participants') }
                         activeClassName='active'>
                  Birthday party participants
                </NavLink>
              </li>
              <li>
                <NavLink to='simple-validation'
                         isActive={(m, loc) => isActive(loc, '/simple-validation')}
                         activeClassName='active'>
                  Simple validation
                </NavLink>
              </li>
              <li>
                <NavLink to='with-bootstrap'
                         isActive={(m, loc) => isActive(loc, 'with-bootstrap')}
                         activeClassName='active'>
                  With Bootstrap
                </NavLink>
              </li>
            </ul>
          </div>
          <div className='presentation-content'>
            <Route path='/all-inputs' component={ AllInputs } />
            <Route path='/birthday-party-participants' component={ BirthdayPartyParticipants } />
            <Route path='/simple-validation' component={ SimpleValidation } />
            <Route path='/with-bootstrap' component={ WithBootstrap } />
          </div>
        </section>
      </Router>
    );
  }
};

export default App;
