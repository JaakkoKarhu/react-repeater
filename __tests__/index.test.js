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
        <input dataKey="test-key" />
      </Repeater>,
      div
    )
  })

  test('Repeater with nested input', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <Repeater>
        <span>
          <input dataKey="test-key" />
        </span>
      </Repeater>,
      div
    )
  })
})

test('Returns mapped data to passed callback function onChange', () => {
  // Not sure if this test is a bit silly
  let receivedData = {}
  const onChange = (e, data) => {
    receivedData = data
  }
  const repeater = shallow(
    <Repeater>
      <input dataKey='test-key'
             onChange={ onChange } />
    </Repeater>
  )
  repeater.find('input').simulate('change', { target: { value: 'a' }})
  expect(receivedData[0]['test-key']).toBe('a')
})

test('Maps passed data to inputs', () => {
  const value = 'This is mapped value.',
        data = [{ 'test-key': value }]
  const repeater = shallow(
    <Repeater data={ data }>
      <input dataKey='test-key' />
    </Repeater>
  )
  const input = repeater.find('input')
  expect(input.node.props.value).toBe(value)
})