import React, { Component } from 'react';
import config from '../config/config.json';
import Form from '../components/Form';
import LoginValidator from '../js/loginValidator';

export default class Login extends Component {
  render() {
    return (
      <section className="login">
        <h3>Log into {config.APP_NAME}</h3>
        <Form
          submitPrompt="Login"
          inputs={[
            {name: 'email', placeholder: 'Email Address', type: 'email'},
            {name: 'password', type: 'password'}
          ]}
          validator={new LoginValidator()}
          redirect="/feed" />
        <br />
        <a href="/forgot" className="forgot">Forgot Password</a>
        <br />
        <a href="/register" className="register">Register</a>
      </section>
    );
  }
}
