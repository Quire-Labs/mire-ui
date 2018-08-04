import FormValidator from './formValidator';

export default class RegisterValidator extends FormValidator {

  constructor() {
    super();
    this.addInputValidator(this.validateEmail);
    this.addInputValidator(this.validateUsername);
    this.addInputValidator(this.validatePassword);
    this.addInputValidator(this.validateMatchingPasswords);
  }

  validateEmail(state) {
    return FormValidator.validateInput(
      'email',
      FormValidator.getInputValue(state, 'email'),
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  }

  validateUsername(state) {
    return FormValidator.validateInput(
      'username',
      FormValidator.getInputValue(state, 'username'),
      /^.{3,15}$/);
  }

  validatePassword(state) {
    return FormValidator.validateInput(
      'password',
      FormValidator.getRawInputValue(state, 'password'),
      /^.{6,}$/);
  }

  validateMatchingPasswords(state) {
    return FormValidator.getRawInputValue(state, 'password')
      === FormValidator.getRawInputValue(state, 'passwordconfirm')
      ? '' : 'Passwords do no match';
  }

}
