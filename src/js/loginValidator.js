import FormValidator from './formValidator';

export default class LoginValidator extends FormValidator {

  constructor() {
    super();
    this.addInputValidator(this.validateEmail);
    this.addInputValidator(this.validatePassword);
  }

  validateEmail(state) {
    return FormValidator.validateInput(
      'email',
      FormValidator.getInputValue(state, 'email'),
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  }

  validatePassword(state) {
    return FormValidator.validateInput(
      'password',
      FormValidator.getRawInputValue(state, 'password'),
      /^.{6,}$/);
  }

}
