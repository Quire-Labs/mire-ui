import FormValidator from '../../js/formValidator';

describe('FormValidator', () => {
  let validator;

  beforeEach(() => {
    validator = new FormValidator();
  });

  it('calls validators', () => {
    let mockValidators = [jest.fn(), jest.fn()];
    mockValidators.forEach(v => {
      v.mockReturnValue('');
      validator.addInputValidator(v);
    });
    validator.validate({});
    expect(mockValidators[0]).toHaveBeenCalledTimes(1);
    expect(mockValidators[1]).toHaveBeenCalledTimes(1);
  });

  it('validates input', () => {
    let mockValidator = jest.fn();
    mockValidator.mockReturnValue('');
    validator.addInputValidator(mockValidator);
    let result = validator.validate({});
    expect(result.isValid).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

  it('returns error when a validator fails', () => {
    let mockValidator = jest.fn();
    mockValidator.mockReturnValue('foobar error');
    validator.addInputValidator(mockValidator);
    let result = validator.validate({});
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toHaveLength(1);
  });

  it('returns errors when multiple validators fail', () => {
    [jest.fn(), jest.fn()].forEach((v, i) => {
      v.mockReturnValue(i + '');
      validator.addInputValidator(v);
    });
    let result = validator.validate({});
    expect(result.isValid).toBeFalsy();
    expect(result.errors).toHaveLength(2);
    expect(result.errors).toContain('0');
    expect(result.errors).toContain('1');
  });
});
