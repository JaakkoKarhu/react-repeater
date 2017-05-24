import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
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

  render() {
    return (
      <section>
        <h1>With Bootstrap</h1>
        <Col xs={ 12 }>
          <Repeater>
            <FieldGroup id="formControlsText"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
            />
          </Repeater>
        </Col>
      </section>
    )
  }
}

export default WithBootstrap