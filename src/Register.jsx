import React, { Component } from 'react';
// import './Register.css';
import config from './config.json';

export default class Register extends Component {
  render() {
    return (
      <section className="register">
        <h3>Register to {config.APP_NAME}</h3>
        <form method="POST" action="/api/users/register">
          <input name="email" type="email" placeholder="Email" />
          <br />
          <input name="first" placeholder="First" />
          <input name="last" placeholder="Last" />
          <br />
          <input name="password" type="password" />
          <br />
          <input name="passwordconfirm" type="password" />
          <br />
          <input type="submit" value="Register" />
        </form>
      </section>
    );
  }
}
