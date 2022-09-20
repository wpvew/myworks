import React from 'react';
import { shallow, configure } from 'enzyme';
import { Dropdown } from '../shared/Dropdown/Dropdown'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })
describe('Dropdown', () => {
  test('should render', () => {
    const wrapper = shallow(<Dropdown children={<div />} />)
    expect(wrapper).toBeDefined();
    expect(wrapper.find('button').isEmptyRender()).toBeFalsy()
  })

  test('should render (snapshot)', () => {
    const wrapper = shallow(<Dropdown children={<div />} />)
    expect(wrapper).toMatchSnapshot()
  })
})
