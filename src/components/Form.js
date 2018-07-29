import React, { Component } from 'react';
import Validator from '../js/formValidator';
import '../css/form.css';
import ErrorList from '../components/ErrorList';
import { register } from '../api/authApi';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordconfirm: '',
      errors: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validator = new Validator();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ErrorList errors={this.state.errors} />
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

  async handleSubmit(event) {
    event.preventDefault();
    const result = this.validator.validate(this.state);
    this.setState({errors: result.errors});
    if (result.isValid) {
      let res = await register(Form.omitErrors(this.state));
      if (res.statusCode && res.statusCode === 200) {
        this.setState({token: res.token});
        Form.redirectToFeed();
      } else {
        this.setState({errors: [res.content]});
      }
    }
    return result.isValid;
  }

  static omitErrors(state) {
    let newState = {...state};
    delete newState.errors
    return newState
  }

  static redirectToFeed() {
    window.location.href = '/feed';
  }
}
