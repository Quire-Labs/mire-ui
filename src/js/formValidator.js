export default class FormValidator {

  constructor() {
    this.state = {};
    this.inputValidators = [];

    this.addInputValidator = this.addInputValidator.bind(this);
    this.validate = this.validate.bind(this);
    this.validateAll = this.validateAll.bind(this);
  }

  addInputValidator(validator) {
    this.inputValidators.push(validator);
  }

  validate(state) {
    this.state = state;
    const errors = this.validateAll();
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  validateAll() {
    let errors = [];
    for (let validator of this.inputValidators) {
      const message = validator(this.state);
      if (message !== '') errors.push(message);
    }
    return errors;
  }

  static validateInput(name, value, regex) {
    if (value === '') {
      return 'Empty ' + name;
    } else if (!value.match(regex)) {
      return 'Invalid ' + name;
    } else {
      return '';
    }
  }

  static getRawInputValue(state, name) {
    return state[name];
  }

  static getInputValue(state, name) {
    return FormValidator.getRawInputValue(state, name).trim();
  }

}
