import React, { Component } from 'react';
import config from '../config/config.json';
import Form from '../components/Form';
import RegisterValidator from '../js/registerValidator';

export default class Register extends Component {
  render() {
    return (
      <section className="register">
        <h3>Register to {config.APP_NAME}</h3>
        <Form
          submitPrompt="Register"
          inputs={[
            {name: 'username', placeholder: 'Username', type: 'text'},
            {name: 'email', placeholder: 'Email Address', type: 'email'},
            {name: 'password', placeholder: 'Password', type: 'password'},
            {name: 'passwordconfirm', placeholder: 'Confirm Password', type: 'password'}
          ]}
          validator={new RegisterValidator()}
          redirect="/discoverTopics" />
      </section>
    );
  }
}
