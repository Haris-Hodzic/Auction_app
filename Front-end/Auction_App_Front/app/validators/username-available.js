import BaseValidator from 'ember-cp-validations/validators/base';
import { inject as service } from '@ember/service';

const UsernameAvailable = BaseValidator.extend({
  httpBase: service(),
  validate(value) {
    return jQuery.ajax({
      method: 'POST',
      url: 'http://localhost:8080/authentication/emailAvailable',
      cache: false,
      data: value,
      contentType: 'application/json'
    }).then((result) => {
     if (result.email === null) {
          return true; 
        } else {
          return "The email is already in use";
        }
      });
  }
});

UsernameAvailable.reopenClass({

   getDependentsFor() {
    return [];
  }
});

export default UsernameAvailable;