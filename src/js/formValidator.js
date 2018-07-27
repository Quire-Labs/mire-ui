export default class Validator {

  constructor() {
    this.state = {};
    this.validate = this.validate.bind(this);
    this.validateAll = this.validateAll.bind(this);
    this.validateEmail = this.validateEmail.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateMatchingPasswords = this.validateMatchingPasswords.bind(this);
    this.validateInput = this.validateInput.bind(this);
    this.getRawInputValue = this.getRawInputValue.bind(this);
    this.getInputValue = this.getInputValue.bind(this);
  }

  validate(state) {
    this.state = state;
    const errors = this.validateAll([
      this.validateEmail, this.validateUsername,
      this.validatePassword, this.validateMatchingPasswords
    ]);
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  validateAll(validators) {
    let errors = [];
    for (let validator of validators) {
      const message = validator();
      if (message !== '') errors.push(message);
    }
    return errors;
  }

  validateEmail() {
    return this.validateInput('email', this.getInputValue('email'),
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  }

  validateUsername() {
    return this.validateInput('username', this.getInputValue('username'), /^.{3,15}$/);
  }

  validatePassword() {
    return this.validateInput('password', this.getRawInputValue('password'), /^.{6,}$/);
  }

  validateMatchingPasswords() {
    return this.getRawInputValue('password') === this.getRawInputValue('passwordconfirm')
      ? '' : 'Passwords do no match';
  }

  validateInput(name, value, regex) {
    if (value === "") {
      return 'Empty ' + name;
    } else if (!value.match(regex)) {
      return 'Invalid ' + name;
    } else {
      return '';
    }
  }

 getRawInputValue(name) {
    return this.state[name];
  }

 getInputValue(name) {
    return this.getRawInputValue(name).trim();
  }

}
