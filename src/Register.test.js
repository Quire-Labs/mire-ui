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
