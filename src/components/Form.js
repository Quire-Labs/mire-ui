import React, { Component } from 'react';
import '../css/form.css';
import ErrorList from '../components/ErrorList';
import { register } from '../api/authApiBridge';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
    for (let inputData of props.inputs) {
      this.state[inputData.name] = '';
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ErrorList errors={this.state.errors} />
        {
          this.props.inputs.map((inputData, i) => {
            return (
              <div key={i}>
                <input
                  name={inputData.name}
                  type={inputData.type || 'text'}
                  placeholder={Form.placeholderForInput(inputData)}
                  value={this.state[inputData.name]}
                  onChange={this.handleChange} />
              </div>
            );
          })
        }
        <input type="submit" value={this.props.submitPrompt} />
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
    const result = this.props.validator.validate(Form.omitErrors(this.state));
    this.setState({errors: result.errors});
    if (result.isValid) {
      let res = await register(Form.omitErrors(this.state));
      if (res.statusCode === 200) {
        this.setState({token: res.token});
        this.redirect();
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

  redirect() {
    if (this.props.redirect) {
      window.location.assign(this.props.redirect);
    }
  }

  static placeholderForInput(inputData) {
    return inputData.placeholder || Form.titleify(inputData.name);
  }

  static titleify(title) {
    title = title.toLocaleLowerCase();
    title = title[0].toLocaleUpperCase() + title.substr(1);
    return title;
  }
}
