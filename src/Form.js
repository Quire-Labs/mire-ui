import React, { Component } from 'react';
import Validator from './formValidator';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordconfirm: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new Validator();
  }

  render() {
    return (
      <form method="POST" action="/api/users/register" onSubmit={this.handleSubmit}>
        <input name="email" type="email" placeholder="Email"
          value={this.state.email} onChange={this.handleChange} />
        <br />
        <input name="username" placeholder="Username"
          value={this.state.username} onChange={this.handleChange} />
        <br />
        <input name="password" type="password"
          value={this.state.password} onChange={this.handleChange} />
        <br />
        <input name="passwordconfirm" type="password"
          value={this.state.passwordconfirm} onChange={this.handleChange} />
        <br />
        <input type="submit" value="Register" />
      </form>
    );
  }

  handleChange(event) {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({[name]: value});
  }

  handleSubmit(event) {
    event.preventDefault();
    return this.validator.validate(this.state).isValid;
  }
}
