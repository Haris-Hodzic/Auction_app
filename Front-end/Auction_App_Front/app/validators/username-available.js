import BaseValidator from 'ember-cp-validations/validators/base';
import { inject as service } from '@ember/service';

const UsernameAvailable = BaseValidator.extend({
  httpBase: service(),
  validate(value) {
    return this.get('httpBase').ajaxReq('http://localhost:8080/authentication/emailAvailable', value, 'POST').then((result) => {
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