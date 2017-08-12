import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import FormControl from 'react-bootstrap/lib/FormControl'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import PropPipe from 'react-prop-pipe'
import Repeater from '../../../src'
import React from 'react'

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
      data: [
        {
          "basic-input": 'This is initial value for basic input',
          "bootstrap-1": 'This is initial value for 1',
          "bootstrap-2": 'This is initial value for 2',
          "bootstrap-3": 'This is initial value for 3',
          "bootstrap-4": 'This is initial value for 4'
        },
        {
          "basic-input": 'This is initial value for basic input',
          "bootstrap-1": 'This is initial value for 1',
          "bootstrap-2": 'This is initial value for 2',
          "bootstrap-3": 'This is initial value for 3',
          "bootstrap-4": 'This is initial value for 4'
        }
      ]
    }
  }

  onChange = (e, data) => {
    console.log('TYPING -->>', e.target.value, data)
    this.setState({ data })
  }

  onUpdate = (data) => {
    console.log('DATA', data)
    this.setState({ data }) 
  }

  render() {
    return (
      <section>
        <h1>With Bootstrap</h1>
        <Col xs={ 12 }>
          <Repeater data={ this.state.data }
                    onUpdate={ this.onUpdate.bind(this) }>
            
            <div>
              <WrapperComp>
                <FormControl placeholder="Enter text to fourth"
                             data-rpt-key="bootstrap-4" />
              </WrapperComp>
            </div>
          </Repeater>
        </Col>
      </section>
    )
  }
}

export default WithBootstrap

/*

            <FieldGroup id="formControlsText"
                        type="text"
                        label="Text"
                        data-rpt-key="bootstrap-1"
                        placeholder="Enter text"
            />
            <FieldGroup id="formControlsText"
                        type="text"
                        label="Text"
                        data-rpt-key="bootstrap-2"
                        placeholder="Enter text"
            />
            <ControlLabel>This is label for third</ControlLabel>
            <FormControl placeholder="Enter text to third"
                         data-rpt-key="bootstrap-3" />
            <div>
              <input data-rpt-key="basic-input" />
            </div>

*/