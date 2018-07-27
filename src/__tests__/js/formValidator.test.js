import Validator from '../../js/formValidator';

const validator = new Validator();
let state = {};

describe('Test empty values', () => {
  beforeEach(() => {
    state = {
      email: '',
      username: '',
      password: '',
      passwordconfirm: ''
    };
  });

  it('fails for all empty values', () => {
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain('Empty email');
    expect(result.errors).toContain('Empty username');
    expect(result.errors).toContain('Empty password');
  });

  it('fails for empty email', () => {
    state.username = 'foobar';
    state.password = 'foobar';
    state.passwordconfirm = 'foobar';
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain('Empty email');
    expect(result.errors).not.toContain('Empty username');
    expect(result.errors).not.toContain('Empty password');
    expect(result.errors).not.toContain('Passwords do no match');
  });

  it('fails for empty username', () => {
    state.email = 'foo@foo.bar';
    state.password = 'foobar';
    state.passwordconfirm = 'foobar';
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).not.toContain('Empty email');
    expect(result.errors).toContain('Empty username');
    expect(result.errors).not.toContain('Empty password');
    expect(result.errors).not.toContain('Passwords do no match');
  });

  it('fails for empty password', () => {
    state.email = 'foo@foo.bar';
    state.username = 'foobar';
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).not.toContain('Empty email');
    expect(result.errors).not.toContain('Empty username');
    expect(result.errors).toContain('Empty password');
    expect(result.errors).not.toContain('Passwords do no match');
  });
});

describe('Test invalid inputs', () => {
  beforeEach(() => {
    state = {
      email: 'foo@foo.foo',
      username: 'foobar',
      password: 'foobar',
      passwordconfirm: 'foobar'
    };
  });

  it('succeeds for valid input', () => {
    let result = validator.validate(state);
    expect(result.isValid).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

  it('fails for mismatched password', () => {
    state.password = 'foo';
    state.passworconfirm = 'bar';
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).not.toContain('Empty email');
    expect(result.errors).not.toContain('Empty username');
    expect(result.errors).not.toContain('Empty password');
    expect(result.errors).toContain('Passwords do no match');
  });

  it('fails for invalid emails', () => {
    state.email = 'foo';
    expectInvalidInput(state, 'email');
    state.email = 'foo@foo';
    expectInvalidInput(state, 'email');
    state.email = 'foo@foo.';
    expectInvalidInput(state, 'email');
    state.email = '@.';
    expectInvalidInput(state, 'email');
    state.email = 'foo@.foo';
    expectInvalidInput(state, 'email');
    state.email = 'foo.';
    expectInvalidInput(state, 'email');
    state.email = 'foo.foo';
    expectInvalidInput(state, 'email');
  });

  function expectInvalidInput(state, name) {
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain('Invalid ' + name);
  }

  it('fails for invalid usernames', () => {
    // too short
    state.username = 'fo';
    expectInvalidInput(state, 'username');
    // too long
    state.username = 'foobarfoobarfoobar';
    expectInvalidInput(state, 'username');
  });

  it('fails for invalid passwords', () => {
    // too short
    state.password = 'fooba';
    expectInvalidInput(state, 'password');
  });
});
