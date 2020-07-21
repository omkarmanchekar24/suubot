import isEmpty from './is-empty';

function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (data.email.length === 0) {
    errors.email = 'Email field is required';
  }

  if (data.password.length === 0) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateLoginInput;
