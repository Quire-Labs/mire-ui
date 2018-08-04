import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../../components/Form';
import Register from '../../components/Register';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { register } from '../../api/authApiBridge';

Enzyme.configure({ adapter: new Adapter() });
jest.mock('../../api/authApiBridge');

describe('Test elements exist', () => {
  let wrapper;

  beforeAll(() => {
    wrapper = shallow(
      <Form submitPrompt="foobar" inputs={[
        {name: 'foo', placeholder: 'foobar', type: 'email'},
        {name: 'bar', type: 'password'},
        {name: 'baz'}]} />
    );
  });

  it('has form', () => {
    expectElementToExist('form');
  });

  it('has all items input', () => {
    expectElementWithNameToExist('foo');
    expectElementWithNameToExist('bar');
    expectElementWithNameToExist('baz');
  });

  it('placeholder is set', () => {
    expect(wrapper.find(`[name='foo']`).props().placeholder).toEqual('foobar');
  });

  it('types are set', () => {
    expectElementToExist(`[type='email']`);
    expectElementToExist(`[type='password']`);
    expectElementToExist(`[type='text']`);
  });

  it('has error reporter', () => {
    expectElementToExist('ErrorList');
  });

  function expectElementToExist(selector) {
    expect(wrapper.find(selector)).toHaveLength(1);
  }

  function expectElementWithNameToExist(name) {
    expectElementToExist(`input[name='${name}']`);
  }
});

describe('Test redirect', () => {
  let wrapper, mockEvent, mockValidator;

  beforeAll(() => {
    let mockValidate = jest.fn();
    mockValidate.mockReturnValue({ isValid: true, errors: [] });
    mockValidator = { validate: mockValidate };
    mockEvent = {
      preventDefault: jest.fn(),
      target: {
        name: 'foo',
        value: 'bar'
      }
    };
    register.mockReturnValue({
      'token': 'foobar',
      'statusCode': 200,
      'content': 'foobar'
    });
  });

  it('redirects to correct url', async () => {
    window.location.assign = jest.fn();
    wrapper = shallow(
      <Form
        submitPrompt=""
        inputs={[]}
        redirect='/foobar'
        validator={mockValidator} />
    );
    await wrapper.instance().handleSubmit(mockEvent);
    expect(window.location.assign).toHaveBeenCalledTimes(1);
  });
});

describe('Test state update', () => {
  let wrapper, preventDefault, mockEvent;

  beforeAll(() => {
    wrapper = shallow(
      <Form submitPrompt="foobar" inputs={[
        {name: 'foo', placeholder: 'foobar', type: 'email'},
        {name: 'bar', type: 'password'}]} />
    );
    preventDefault = jest.fn();
    mockEvent = {
      preventDefault,
      target: {
        name: 'foo',
        value: 'bar'
      }
    };
  });

  it('updates state when field value changes', () => {
    expectStateToUpdate('foo');
    expectStateToUpdate('bar');
  });

  function expectStateToUpdate(inputName) {
    let input = wrapper.find(`input[name='${inputName}']`);
    input.simulate('change', mockEvent);
    expect(preventDefault).toBeCalled();
    expect(wrapper.state().foo).toBeDefined();
    expect(wrapper.state().foo).toMatch('bar');
  }
});

describe('Test validator', () => {
  let wrapper, preventDefault, mockEvent, mockValidate;

  beforeAll(() => {
    mockValidate = jest.fn();
    let mockValidator = { validate: mockValidate };
    wrapper = shallow(
      <Form
        submitPrompt="foobar"
        inputs={[
          {name: 'foo', placeholder: 'foobar', type: 'email'},
          {name: 'bar', type: 'password'}
        ]}
        validator={mockValidator} />
    );
    mockEvent = { preventDefault: jest.fn() };
  });

  beforeEach(() => {
    register.mockClear();
  });

  it('calls api on valid', async () => {
    register.mockReturnValue({
      'token': 'foobar',
      'statusCode': 200,
      'content': 'foobar'
    });
    mockValidate.mockReturnValue({errors: [], isValid: true});
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).toHaveBeenCalledTimes(1);
  });

  it('prevents api call on invalid', async () => {
    mockValidate.mockReturnValue({errors: [], isValid: false});
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).not.toHaveBeenCalled();
  });

  it('sets error state on error', async () => {
    mockValidate.mockReturnValue({errors: ['foo', 'bar'], isValid: false});
    await wrapper.instance().handleSubmit(mockEvent);
    expect(wrapper.state().errors).toContain('foo');
    expect(wrapper.state().errors).toContain('bar');
  });

  afterEach(() => {
    register.mockClear();
  });

});

describe('Test api', () => {
  let wrapper, mockEvent, redirectSpy, mockValidator, mockValidate;
  const mockValidState = { 'foo': 'bar' };

  beforeEach(() => {
    setupMocks();
    wrapper = shallow(
      <Form submitPrompt="" inputs={[]} validator={mockValidator} />
    );
    wrapper.setState(mockValidState);
  });

  it('receives correct data', async () => {
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).toHaveBeenCalledTimes(1);
    expect(register).toHaveBeenCalledWith(mockValidState);
  });

  it('redirects for correct data', async () => {
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).toHaveBeenCalledTimes(1);
    expect(redirectSpy).toHaveBeenCalledTimes(1);
  });

  it('handles server-side errors', async () => {
    mockRegisterInvalid();
    await wrapper.instance().handleSubmit(mockEvent);
    expect(register).toHaveBeenCalledTimes(1);
    expect(wrapper.state().errors).toContain('foobar error');
    expect(redirectSpy).not.toHaveBeenCalled();
  });

  afterEach(() => {
    register.mockClear();
  });

  function setupMocks() {
    mockRegisterValid();
    mockRedirectFunction();
    mockValidateFunction();
    mockEvent = { preventDefault: jest.fn() };
    register.mockClear();
  }

  function mockRedirectFunction() {
    jest.mock('../../components/Form');
    redirectSpy = jest.spyOn(Form.prototype, 'redirect');
    redirectSpy.mockClear();
  }

  function mockValidateFunction() {
    mockValidate = jest.fn();
    mockValidator = { validate: mockValidate };
    mockValidate.mockReturnValue({isValid: true, errors: []});
  }

  function mockRegisterValid() {
    register.mockReturnValue({
      'token': 'foobar',
      'statusCode': 200,
      'content': 'foobar success'
    });
  }

  function mockRegisterInvalid() {
    register.mockReturnValue({
      'token': 'foobar',
      'statusCode': 400,
      'content': 'foobar error'
    });
  }

});
