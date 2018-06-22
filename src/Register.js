import React, { Component } from 'react';
import config from './config.json';
import ReactLoading from 'react-loading';
import './Register.css';
import { submit } from './register-form.js';

export default class Register extends Component {
  render() {
    return (
      <section className="register">
        <h3>Register to {config.APP_NAME}</h3>
        <form method="POST" onSubmit={submit}>
          <input name="email" type="email" placeholder="Email" />
          <br />
          <input name="username" placeholder="Username" />
          <br />
          <input name="password" type="password" />
          <br />
          <input name="passwordconfirm" type="password" />
          <br />
          <input type="submit" value="Register" />
          <br />
          <span className="spinner hidden">
            <ReactLoading type="spokes" color="#000" />
          </span>
        </form>
      </section>
    );
  }
}
