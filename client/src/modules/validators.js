const validators = {
  notEmpty: value => {
    if (value.length) return null;
    return 'The field shouldn`t be empty';
  },
  maxLengths: length => value => {
    if (value.length <= length) return null;
    return `value should not be longer then ${length} symbols`;
  },
  minLengths: length => value => {
    if (value.length >= length) return null;
    return `value should not be shorter then ${length} symbols`;
  },
  onlyCharsAndNumbers: value => /^[a-zA-Z0-9]+$/.test(value) ? null : "Should contain only chars and numbers",
  password: value => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value) ? null :
    `At least one uppercase letter
  At least one lowercase letter
  At least one digit
  Minimum length of 8 characters`,
  fullName: value => /^[a-zA-Z]+ [a-zA-Z]+/.test(value) ? null : 'Please enter your full name (at least first and last name)',
  email: value => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value) ? null : "Invalid email format",
};

export const fieldValidators = {
  name: [validators.notEmpty, validators.maxLengths(30), validators.minLengths(5),  validators.fullName],
  email: [validators.notEmpty, validators.email],
  birthDate: [validators.notEmpty],
};
