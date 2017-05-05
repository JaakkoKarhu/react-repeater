import React from 'react';
import { shallow } from 'enzyme';

import Repeater from '../src/index';

test('Basic rendering test', () => {

  const repeater = shallow(
    <Repeater />
  )
  expect(repeater).toMatchSnapshot()
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