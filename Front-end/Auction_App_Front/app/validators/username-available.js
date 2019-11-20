import BaseValidator from 'ember-cp-validations/validators/base';
import { inject as service } from '@ember/service';

const UsernameAvailable = BaseValidator.extend({
  productHttp: service(),
  validate(value) {
    return this.get('productHttp').emailAvailable(value).then((result) => {
      if (result === false) {
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
