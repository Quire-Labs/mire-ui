import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Elements Exist', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Form />);
  });

  it('has form', () => {
    hasElementTest('form');
  });

  it('has email input', () => {
    hasElementWithNameTest('email');
  });

  it('has username input', () => {
    hasElementWithNameTest('username');
  });

  it('has password input', () => {
    hasElementWithNameTest('password');
  });

  it('has passwordconfirm input', () => {
    hasElementWithNameTest('passwordconfirm');
  });

  it('has register button', () => {
    hasElementTest(`input[type='submit']`);
  });

  function hasElementTest(selector) {
    expect(wrapper.find(selector)).toBeTruthy();
  }

  function hasElementWithNameTest(name) {
    hasElementTest(`input[name='${name}']`);
  }
});

describe('Test State Update', () => {
  let wrapper, preventDefault, mockEvent;

  beforeAll(() => {
    wrapper = shallow(<Form />);
    preventDefault = jest.fn();
    mockEvent = {
      preventDefault,
      target: {
        name: 'foo',
        value: 'bar'
      }
    };
  });

  it('updates state when email value changes', () => {
    updateStateTest('email');
  });

  it('updates state when username value changes', () => {
    updateStateTest('username');
  });

  it('updates state when password value changes', () => {
    updateStateTest('password');
  });

  it('updates state when passwordconfirm value changes', () => {
    updateStateTest('passwordconfirm');
  });

  function updateStateTest(inputName) {
    let input = wrapper.find(`input[name='${inputName}']`);
    input.simulate('change', mockEvent);
    expect(preventDefault).toBeCalled();
    expect(wrapper.state().foo).toBeDefined();
    expect(wrapper.state().foo).toMatch('bar');
  }
});
