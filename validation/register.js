const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.mobile = !isEmpty(data.mobile) ? data.mobile : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.street = !isEmpty(data.street) ? data.street : "";
  data.town = !isEmpty(data.town) ? data.town : "";
  data.city = !isEmpty(data.city) ? data.city : "";
  data.state = !isEmpty(data.state) ? data.state : "";
  data.pincode = !isEmpty(data.pincode) ? data.pincode : "";
  data.country = !isEmpty(data.country) ? data.country : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.username, { min: 6, max: 30 })) {
    errors.username = "Username must be at least 6 characters";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (!Validator.isLength(data.mobile, { min: 10, max: 10 })) {
    errors.mobile = "Not a valid mobile number";
  }

  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = "Mobile field is required";
  }

  if (!Validator.isLength(data.address, { min: 2, max: 30 })) {
    errors.address = "Address must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }

  if (!Validator.isLength(data.city, { min: 2, max: 30 })) {
    errors.city = "City must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.city)) {
    errors.city = "City field is required";
  }

  if (!Validator.isLength(data.town, { min: 2, max: 30 })) {
    errors.town = "Town must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.town)) {
    errors.town = "Town field is required";
  }

  if (!Validator.isLength(data.street, { min: 2, max: 30 })) {
    errors.street = "Street must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.street)) {
    errors.street = "Street field is required";
  }

  if (!Validator.isLength(data.states, { min: 2, max: 30 })) {
    errors.states = "State must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.states)) {
    errors.states = "State field is required";
  }

  if (Validator.isEmpty(data.pincode)) {
    errors.pincode = "Name field is required";
  }

  if (!Validator.isLength(data.country, { min: 2, max: 30 })) {
    errors.country = "Country must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.country)) {
    errors.country = "Country field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
