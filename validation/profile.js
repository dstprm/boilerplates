const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfile  (data) {
  let errors = {};

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "handle is required";
    data.handle = "";
  }

  if (Validator.isEmpty(data.status)) {
    errors.status = "status is required";
    data.status = "";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
