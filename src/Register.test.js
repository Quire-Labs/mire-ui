import React from 'react';
import ReactDOM from 'react-dom';
import Register from './Register';
import config from './config.json';

let testElem;
beforeAll(() => {
  testElem = document.createElement('div');
  ReactDOM.render(<Register />, testElem);
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

it('has email input', () => {
  expect(testElem.querySelector('input[name=email]')).toBeTruthy();
});

it('has first input', () => {
  expect(testElem.querySelector('input[name=first]')).toBeTruthy();
});

it('has last input', () => {
  expect(testElem.querySelector('input[name=last]')).toBeTruthy();
});

it('has password input', () => {
  expect(testElem.querySelector('input[name=password]')).toBeTruthy();
});

it('has passwordconfirm input', () => {
  expect(testElem.querySelector('input[name=passwordconfirm]')).toBeTruthy();
});

it('has register button', () => {
  expect(testElem.querySelector('input[type=submit]')).toBeTruthy();
})
