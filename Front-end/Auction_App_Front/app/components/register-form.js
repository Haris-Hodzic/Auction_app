import {inject as service} from '@ember/service';
import Component from '@ember/component';
import {set} from '@ember/object';
import {later} from '@ember/runloop';

export default Component.extend({
  user: null,
  userHttp: service(),
  store: service(),
  errors: false,
  session: service('session'),
  actions: {
    register() {
      let user = this.get('user');
      const firstName = this.get('firstName');
      const lastName = this.get('lastName');
      const email = this.get('email');
      const password = this.get('password');
      const data = JSON.stringify({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password
      });

      set(user, 'firstName', firstName);
      set(user, 'lastName', lastName);
      set(user, 'email', email);
      set(user, 'password', password);

      user.validate()
      .then(({
        validations
      }) => {
        if (validations.get('isValid')) {
          this.get('userHttp').register(data);
          var _this = this;
          later((function() {
            _this.get('session').authenticate('authenticator:token', {
              email,
              password
            });
            _this.get('router').transitionTo('home');
          }), 1000);
        } else {
          this.set('errors', true);
        }
      });
    },
  },
});