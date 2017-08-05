import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import PropPipe from 'react-prop-pipe'
import Repeater from '../../../src'
import React from 'react'

const FieldGroup = ({ id, label, help, ...props }) => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}

class WithBootstrap extends React.Component {
  constructor(props) {
    super(props)
  }

  onChange = (e, data) => {
    console.log('TYPING -->>', e.target.value, data)
    this.setState({ data })
  }

  render() {
    return (
      <section>
        <h1>With Bootstrap</h1>
        <Col xs={ 12 }>
          <Repeater>
            <FieldGroup id="formControlsText"
                        type="text"
                        label="Text"
                        data-rpt-key="bootstrap"
                        onChange={ this.onChange }
                        placeholder="Enter text"
            />
            <div>
              <input data-rpt-key="basic-input" />
            </div>
          </Repeater>
        </Col>
      </section>
    )
  }
}

export default WithBootstrap