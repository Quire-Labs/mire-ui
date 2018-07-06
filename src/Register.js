import React, { Component } from 'react';
import config from './config.json';
import Form from './Form';

export default class Register extends Component {
  render() {
    return (
      <section className="register">
        <h3>Register to {config.APP_NAME}</h3>
        <Form />
      </section>
    );
  }
}
