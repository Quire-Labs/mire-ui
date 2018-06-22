import config from './config.json';
import urljoin from 'url-join';
import $ from 'jquery';

const apiUrl = urljoin(config.API_ENDPOINT, '/users/register');

export function submit(event) {
  event.preventDefault();
  if (validateForm()) {
    visualizeLoading();
    postJSON(apiUrl, formDataAsJson()).then(handleResponse);
  }
}

function postJSON(url, jsonBody) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonBody)
  });
}

function formDataAsJson() {
  return {
    email: getInputValue('email'),
    username: getInputValue('username'),
    password: getRawInputValue('password'),
    passwordconfirm: getRawInputValue('passwordconfirm')
  };
}

function handleResponse(response) {
  response.json().then(json => {
    if (response.status !== 200) {
      reportErrors(['Failed to register user:', json.msg]);
      cancelVisualizeLoading();
    } else {
      navigateToLogin();
    }
  });
}

function visualizeLoading() {
  disableSubmitButton();
  showSpinner();
}

function cancelVisualizeLoading() {
  enableSubmitButton();
  hideSpinner();
}

function enableSubmitButton() {
  setSubmitButtonDisabled(false);
}

function disableSubmitButton() {
  setSubmitButtonDisabled(true);
}

function setSubmitButtonDisabled(disabled) {
  $('input[type=submit]').prop('disabled', disabled);
}

function showSpinner() {
  $('.spinner').removeClass('hidden');
}

function hideSpinner() {
  $('.spinner').addClass('hidden');
}

function validateForm() {
  const errors = validateAll([
    validateEmail, validateUsername,
    validatePassword, validateMatchingPasswords
  ]);
  if (errors.length > 0) {
    reportErrors(errors);
    return false;
  }
  return true;
}

function validateAll(validators) {
  let errors = [];
  for (let validator of validators) {
    const message = validator();
    if (message !== '') errors = errors.push(message);
  }
  return errors;
}

function getRawInputValue(name) {
  return $(`input[name=${name}]`).val();
}

function getInputValue(name) {
  return getRawInputValue(name).trim();
}

function validateEmail() {
  return validateInput('email', getInputValue('email'),
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/);
}

function validateUsername() {
  return validateInput('username', getInputValue('username'), /.{3,15}/);
}

function validatePassword() {
  return validateInput('password', getRawInputValue('password'), /.{6,}/);
}

function validateMatchingPasswords() {
  return getRawInputValue('password') === getRawInputValue('passwordconfirm')
    ? '' : 'Passwords do no match';
}

function validateInput(name, value, regex) {
  if (value === "") {
    return 'Empty ' + name;
  } else if (!value.match(regex)) {
    return 'Invalid ' + name;
  } else {
    return '';
  }
}

function reportErrors(errors) {
  let report = '';
  for (let error of errors) {
    report += error + '\n';
  }
  alert(report);
}

function navigateToLogin() {
  document.location = '/login';
}
