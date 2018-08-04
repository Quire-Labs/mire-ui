import LoginValidator from '../../js/loginValidator';

const validator = new LoginValidator();
let state = {};

describe('Test empty values', () => {
  beforeEach(() => {
    state = {
      email: '',
      password: '',
    };
  });

  it('fails for all empty values', () => {
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain('Empty email');
    expect(result.errors).toContain('Empty password');
  });

  it('fails for empty email', () => {
    state.password = 'foobar';
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toContain('Empty email');
    expect(result.errors).not.toContain('Empty password');
  });

  it('fails for empty password', () => {
    state.email = 'foo@foo.bar';
    let result = validator.validate(state);
    expect(result.isValid).toBeFalsy();
    expect(result.errors).not.toContain('Empty email');
    expect(result.errors).toContain('Empty password');
  });
});

describe('Test valid inputs', () => {

  it('succeeds for valid input', () => {
    state = {
      email: 'foo@foo.bar',
      password: 'foobar',
    };
    let result = validator.validate(state);
    expect(result.isValid).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

});

describe('Test invalid inputs', () => {
  beforeEach(() => {
    state = {
      email: 'foo@foo.foo',
      password: 'foobar',
    };
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

  it('fails for invalid passwords', () => {
    // too short
    state.password = 'fooba';
    expectInvalidInput(state, 'password');
  });
});
