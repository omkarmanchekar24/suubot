import isEmpty from './is-empty';

function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.username = !isEmpty(data.username) ? data.username : '';
  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.street = !isEmpty(data.street) ? data.street : '';
  data.town = !isEmpty(data.town) ? data.town : '';
  data.city = !isEmpty(data.city) ? data.city : '';
  data.state = !isEmpty(data.state) ? data.state : '';
  data.pincode = !isEmpty(data.pincode) ? data.pincode : '';
  data.country = !isEmpty(data.country) ? data.country : '';

  if (data.name.length === 0) {
    errors.name = 'Name field is required';
  }

  if (data.email.length === 0) {
    errors.email = 'Email field is required';
  }

  if (data.password.length === 0) {
    errors.password = 'Password field is required';
  }

  if (data.username.length === 0) {
    errors.username = 'Username field is required';
  }

  if (data.mobile.length === 0) {
    errors.mobile = 'Mobile field is required';
  }

  if (data.address.length === 0) {
    errors.address = 'Address field is required';
  }

  if (data.city.length === 0) {
    errors.city = 'City field is required';
  }

  if (data.town.length === 0) {
    errors.town = 'Town field is required';
  }

  if (data.street.length === 0) {
    errors.street = 'Street field is required';
  }

  if (data.state.length === 0) {
    errors.states = 'State field is required';
  }

  if (data.pincode.length === 0) {
    errors.pincode = 'Name field is required';
  }

  if (data.country.length === 0) {
    errors.country = 'Country field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
}

export default validateRegisterInput;
