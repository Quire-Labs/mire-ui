import React from 'react';
import ReactDOM from 'react-dom';
import ErrorList from './ErrorList';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

beforeAll(() => {
  wrapper = shallow(<ErrorList />);
});

it('has .error element', () => {
  expect(wrapper.find('.error')).toBeTruthy();
});

it('shows nothing at first', () => {
  expect(wrapper.text().trim()).toMatch('');
});

it('reports errors', () => {
  const errorList = [
    'foo',
    'bar'
  ];
  wrapper = shallow(<ErrorList errors={errorList} />);
  expect(wrapper.text()).toMatch('foo');
  expect(wrapper.text()).toMatch('bar');
});
