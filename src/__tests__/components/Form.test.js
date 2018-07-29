import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../../components/Form';
import Register from '../../components/Register';
import Feed from '../../components/Feed';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { register } from '../../api/authApi';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../api/authApi');

describe('Test elements exist', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(<Form />);
  });

  it('has form', () => {
    expectElementToExist('form');
  });

  it('has email input', () => {
    expectElementWithNameToExist('email');
  });

  it('has username input', () => {
    expectElementWithNameToExist('username');
  });

  it('has password input', () => {
    expectElementWithNameToExist('password');
  });

  it('has passwordconfirm input', () => {
    expectElementWithNameToExist('passwordconfirm');
  });

  it('has register button', () => {
    expectElementToExist(`input[type='submit']`);
  });

  it('has error reporter', () => {
    expectElementToExist('ErrorList');
  });

  function expectElementToExist(selector) {
    expect(wrapper.find(selector)).toBeTruthy();
  }

  function expectElementWithNameToExist(name) {
    expectElementToExist(`input[name='${name}']`);
  }
});

describe('Test state update', () => {
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
    expectStateToUpdate('email');
  });

  it('updates state when username value changes', () => {
    expectStateToUpdate('username');
  });

  it('updates state when password value changes', () => {
    expectStateToUpdate('password');
  });

  it('updates state when passwordconfirm value changes', () => {
    expectStateToUpdate('passwordconfirm');
  });

  function expectStateToUpdate(inputName) {
    let input = wrapper.find(`input[name='${inputName}']`);
    input.simulate('change', mockEvent);
    expect(preventDefault).toBeCalled();
    expect(wrapper.state().foo).toBeDefined();
    expect(wrapper.state().foo).toMatch('bar');
  }
});

describe('Test form validation', () => {
  let spy, wrapper, preventDefault, mockEvent;

  beforeEach(() => {
    spy = jest.spyOn(Form.prototype, 'handleSubmit');
    wrapper = shallow(<Form />);
    preventDefault = jest.fn();
    mockEvent = { preventDefault };
  });

  it('has submit method', () => {
    wrapper.simulate('submit', mockEvent);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('fails to submit when no values', async () => {
    expectAllHaveEmptyValue(['email', 'username', 'password', 'passwordconfirm']);
    let result = await wrapper.instance().handleSubmit(mockEvent);
    expect(result).toBeFalsy();
    expect(wrapper.state().errors).toContain('Empty email');
    expect(wrapper.state().errors).toContain('Empty username');
    expect(wrapper.state().errors).toContain('Empty password');
  });

  it('submits when values are valid', () => {
    setValidValues();
    let result = wrapper.instance().handleSubmit(mockEvent);
    expect(result).toBeTruthy();
  });

  function setValidValues() {
    setValue('email', 'foo@foo.foo');
    setValue('password', 'foobar');
    setValue('passwordconfirm', 'foobar');
    setValue('username', 'foobar');
  }

  function setValue(inputName, value) {
    wrapper.setState({ [inputName]: value });
  }

  function expectAllHaveEmptyValue(names) {
    for (let name of names) {
      expect(wrapper.find(`input[name='${name}']`).props().value).toMatch('');
    }
  }

  afterEach(() => {
    spy.mockRestore();
  });
});

describe('Test api', () => {
  let wrapper, mockEvent, redirectToFeedSpy;
  const mockValidState = {
    'email': 'foo@foo.foo',
    'password': 'foobar',
    'passwordconfirm': 'foobar',
    'username': 'foobar'
  };
  const mockToken = 'foobar';

  beforeEach(() => {
    setupMocks();
    wrapper = shallow(<Form />);
    wrapper.setState(mockValidState);
  });

  it('receives correct data', async () => {
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith(mockValidState);
  });

  it('not called for invalid data', async () => {
    wrapper.setState({'email': ''});
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).not.toHaveBeenCalled();
  });

  it('returns auth token for correct data', async () => {
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).toHaveBeenCalledTimes(1);
    expect(wrapper.state().token).toEqual(mockToken);
  });

  it('redirects for correct data', async () => {
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).toHaveBeenCalledTimes(1);
    expect(redirectToFeedSpy).toHaveBeenCalledTimes(1);
  });

  it('handles server-side errors', async () => {
    mockRegisterInvalid();
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).toHaveBeenCalledTimes(1);
    expect(wrapper.state().errors).toContain('Username already taken!');
    expect(redirectToFeedSpy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    register.mockClear();
  });

  function setupMocks() {
    mockRegisterValid();
    mockEvent = { preventDefault: jest.fn() };
    jest.mock('../../components/Form');
    redirectToFeedSpy = jest.spyOn(Form, 'redirectToFeed');
    redirectToFeedSpy.mockClear();
    register.mockClear();
  }

  function mockRegisterValid() {
    register.mockReturnValue({
      'token': mockToken,
      'statusCode': 200,
      'content': 'Created user'
    });
  }

  function mockRegisterInvalid() {
    register.mockReturnValue({
      'token': mockToken,
      'statusCode': 400,
      'content': 'Username already taken!'
    });
  }

});
