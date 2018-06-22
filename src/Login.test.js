import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import config from './config.json';

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
  expect(testElem.getElementsByTagName('form')).not.toHaveLength(0);
});

it('requests user email', () => {
  expect(testElem.querySelectorAll('input[type=email]')).not.toHaveLength(0);
});

it('requests user password', () => {
  expect(testElem.querySelectorAll('input[type=password]')).not.toHaveLength(0);
});

it('has login button', () => {
  expect(testElem.querySelectorAll('input[type=submit]')).not.toHaveLength(0);
});

it('has forgot link', () => {
  expect(testElem.querySelectorAll('a.forgot')).not.toHaveLength(0);
});

it('has create new account button', () => {
  expect(testElem.querySelectorAll('input[type=button].register')).not.toHaveLength(0);
});
