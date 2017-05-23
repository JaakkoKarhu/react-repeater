import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'

import Repeater from '../src/index';

describe('Basic render tests', () => {

  test('Repeater', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Repeater />, div)
  })

  test('Repeater with input', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Repeater>
        <input data-rpt-key="test-key" />
      </Repeater>,
      div
    )
  })

  test('Repeater with nested input', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Repeater>
        <span>
          <input data-rpt-key="test-key" />
        </span>
      </Repeater>,
      div
    )
  })
})

describe('Initialisation tests', () => {

  test('Return default||null value on init of basic inputs', () => {
    const repeater = shallow(
      <Repeater>
        <input data-rpt-key='test-key-1' />
        <input data-rpt-key='test-key-2'
               value='test-value' />
      </Repeater>
    )
    expect(repeater.state('dataValues')[0]['test-key-1']).toBe(null)
    expect(repeater.state('dataValues')[0]['test-key-2']).toBe('test-value')
  })

  test('Return default||null wether checked or not on radio & checkbox', () => {
    const repeater = shallow(
      <Repeater>
        { /* Radio: Option not checked */ }
        <input type='radio'
               name='radio-no-option-checked'
               data-rpt-key='radio-no-option-checked'
               value='radio-value-1' />
        <input type='radio'
               name='radio-no-option-checked'
               data-rpt-key='radio-no-option-checked'
               value='radio-value-2' />
        { /* Radio: One option checked */ } 
        <input type='radio'
               name='radio-option-checked'
               data-rpt-key='radio-option-checked'
               value='radio-value-1' />
        <input type='radio'
               name='radio-option-checked'
               data-rpt-key='radio-option-checked'
               checked
               value='radio-value-2' />
        { /* Checkbox */ }
        <input type='checkbox'
               data-rpt-key='checkbox-not-checked'
               value='checkbox-value' />
        <input type='checkbox'
               data-rpt-key='checkbox-checked'
               checked
               value='checkbox-value' />
      </Repeater>
    )
    expect(repeater.state('dataValues')[0]['radio-no-option-checked']).toBe(null)
    expect(repeater.state('dataValues')[0]['radio-option-checked']).toBe('radio-value-2')
    expect(repeater.state('dataValues')[0]['checkbox-not-checked']).toBe(null)
    expect(repeater.state('dataValues')[0]['checkbox-checked']).toBe('checkbox-value')
  })

  test('Maps passed data to inputs', () => {
    const value = 'This is mapped value.',
          data = [{ 'test-key': value }]
    const repeater = shallow(
      <Repeater data={ data }>
        <input data-rpt-key='test-key' />
      </Repeater>
    )
    const input = repeater.find('input')
    expect(input.node.props.value).toBe(value)
  })

  test('Set checked for radio & checkbox if default data is passed', () => {
    const checkboxValue = 'Mapped checkbox value',
          radioValue = 'Mapped radio value',
          data = [{
            'checkbox-key-1': checkboxValue,
            'radio-key': radioValue
          }]
    const repeater = shallow(
      <Repeater data={ data }>
       { /* Checkboxes */ } 
        <input type='checkbox'
               name='checkbox-1'
               data-rpt-key='checkbox-key-1'
               value={ checkboxValue } />
        <input type='checkbox'
               name='checkbox-2'
               data-rpt-key='checkbox-key-2'
               value='Another mapped value' />
        { /* Radios */ }
        <input type='radio'
               name='radio-1'
               data-rpt-key='radio-key'
               value={ radioValue } />
        <input type='radio'
               name='radio-2'
               data-rpt-key='radio-key'
               value={ 'Another radio value' } />
      </Repeater>
    )
    const checkbox1 = repeater.find('input[name="checkbox-1"]'),
          checkbox2 = repeater.find('input[name="checkbox-2"]'),
          radio1 = repeater.find('input[name="radio-1"]'),
          radio2 = repeater.find('input[name="radio-2"]')
    expect(checkbox1.node.props.checked).toBe(true)
    expect(checkbox2.node.props.checked).toBe(false)
    expect(radio1.node.props.checked).toBe(true)
    expect(radio2.node.props.checked).toBe(false)
  })
})

describe('Functionality tests', () => {
  test('Returns mapped data to passed callback function onChange', () => {
    // Not sure if this test is a bit silly
    let receivedData = {}
    const onChange = (e, data) => {
      receivedData = data
    }
    const repeater = shallow(
      <Repeater>
        <input data-rpt-key='test-key'
               onChange={ onChange } />
      </Repeater>
    )
    repeater.find('input').simulate('change', { target: { value: 'a' }})
    expect(receivedData[0]['test-key']).toBe('a')
  })

  test('Works with textarea as well - maps data', () => {
    let receivedData = []
    const onChange = (e, data) => receivedData = data
    const repeater = shallow(
      <Repeater>
        <textarea data-rpt-key='test-key'
                  onChange={ onChange } />
      </Repeater>
    )
    repeater.find('textarea').simulate('change', { target: { value: 'works'}})
    expect(receivedData[0]['test-key']).toBe('works')
  })

  test('Deletes row when clicking delete button', () => {
    let receivedData = []
    const data = [
      {
        'test-key': 'value 1'
      },
      {
        'test-key': 'value 2'
      }
    ]
    const onClick = (e, data) => receivedData = data
    const repeater = shallow(
      <Repeater data={ data }>
        <div className='delete'
             data-rpt-delete={ true }
             onClick={ onClick } />
      </Repeater>
    )
    repeater.find('.delete').first().simulate('click')
    expect(receivedData.length).toBe(1)
    expect(receivedData[0]['test-key']).toBe('value 2')
  })
})