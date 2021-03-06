import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../../components/Login';
import config from '../../config/config.json';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Structure', () => {
  let testElem;
  beforeAll(() => {
    testElem = document.createElement('div');
    ReactDOM.render(<Login />, testElem);
  });

  afterAll(() => {
    ReactDOM.unmountComponentAtNode(testElem);
  });

  it('contains the app\'s name', () => {
    expect(testElem.textContent).toMatch(config.APP_NAME);
  });

  it('contains a form', () => {
    expect(testElem.querySelector('form')).toBeTruthy();
  });

  it('requests user email', () => {
    expect(testElem.querySelector('input[name=email]')).toBeTruthy();
  });

  it('requests user password', () => {
    expect(testElem.querySelector('input[name=password]')).toBeTruthy();
  });

  it('has login button', () => {
    expect(testElem.querySelector('input[type=submit]')).toBeTruthy();
  });

  it('has forgot link', () => {
    expect(testElem.querySelector('a.forgot')).toBeTruthy();
  });

  it('has create new account link', () => {
    expect(testElem.querySelector('a.register')).toBeTruthy();
  });

  it('links to /register', () => {
    expect(testElem.querySelector('a.register').href).toMatch('/register');
  });

  it('links to /forgot', () => {
    expect(testElem.querySelector('a.forgot').href).toMatch('/forgot');
  });
});
