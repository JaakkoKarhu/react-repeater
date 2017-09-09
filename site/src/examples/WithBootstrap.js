import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import Checkbox from 'react-bootstrap/lib/Checkbox'
import Radio from 'react-bootstrap/lib/Radio'
import Button from 'react-bootstrap/lib/Button'
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/lib/ToggleButton'
import PropPipe from 'react-prop-pipe'
import Repeater from '../../../src'
import React from 'react'
import getIntendedJSON from '../utilities/getIntendedJSON'

const FieldGroup = ({ id, label, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

const WrapperComp = (props) => {
  return (
    <span style={ { border: 'solid thin red'} }>
      { props.children }
    </span>
  )
}

class WithBootstrap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{
        'bootstrap-4': 'INITIAL VALUE'
      }]
    }
  }

  onChange = (e, data) => {
    this.setState({ data })
  }

  onUpdate = (data) => {
    this.setState({ data }) 
  }

  render() {
    return (
      <section>
        <h1>With Bootstrap</h1>
        <Col xs={ 6 }>
          <Repeater data={ this.state.data }
                    onUpdate={ this.onUpdate.bind(this) }>
              <form>
                <FieldGroup
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Enter text"
                  data-rpt-key="bs-text"
                />
                <FieldGroup
                  id="formControlsEmail"
                  type="email"
                  label="Email address"
                  placeholder="Enter email"
                  data-rpt-key="bs-email"
                />
                <FieldGroup
                  id="formControlsPassword"
                  label="Password"
                  type="password"
                  data-rpt-key="bs-password"
                />
                <FieldGroup
                  id="formControlsFile"
                  type="file"
                  label="File"
                  help="Example block-level help text here."
                  data-rpt-key="bs-file"
                />
                <FormGroup controlId="formControlsSelect">
                  <ControlLabel>Select</ControlLabel>
                  <FormControl data-rpt-key="bs-select" componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    <option value="...">...</option>
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsSelectMultiple">
                  <ControlLabel>Multiple select</ControlLabel>
                  <FormControl data-rpt-key="bs-select-multiple" componentClass="select" multiple>
                    <option value="select (multiple)">select (multiple)</option>
                    <option value="...">...</option>
                  </FormControl>
                </FormGroup>
                <FormGroup controlId="formControlsTextarea">
                  <ControlLabel>Textarea</ControlLabel>
                  <FormControl componentClass="textarea"
                               placeholder="textarea"
                               data-rpt-key="bs-textarea"/>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Static text</ControlLabel>
                  <FormControl.Static>
                    email@example.com
                  </FormControl.Static>
                </FormGroup>
                <Button type="submit">
                  Submit
                </Button>
              </form>
          </Repeater>
        </Col>
        <Col xs={ 6 }>
          <h2>Returns:</h2>
          <div className='presentation-well-json'>
              {
                getIntendedJSON(this.state.data)
              }
          </div>
        </Col>
      </section>
    )
  }
}

export default WithBootstrap