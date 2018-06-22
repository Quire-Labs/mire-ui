import React, { Component } from 'react';
import config from './config.json';

export default class Login extends Component {
  render() {
    return (
      <section className="login">
        <h3>Log into {config.APP_NAME}</h3>
        <form method="POST" action="/api/users/login">
          <input name="email" type="email" placeholder="Email Address" />
          <br />
          <input name="password" type="password" placeholder="Password" />
          <br />
          <input type="submit" value="Login" />
          <br />
          <a href="javascript:alert('todoforgot');" className="forgot">
            Forgot Password
          </a>
          <br />
          <a href="/register" className="register">Register</a>
        </form>
      </section>
    );
  }
}
