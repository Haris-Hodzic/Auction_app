import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {set} from '@ember/object';

export default Component.extend({
  session: service('session'),
  loginuser: null,
  errors: false,
  errorMessage: false,
  actions: {
    authenticate() {
      let loginuser = this.get('luser');
      const email = this.get('email');
      const password = this.get('password');

      set(loginuser, 'email', email);
      set(loginuser, 'password', password);

      loginuser.validate()
      .then(({
        validations
      }) => {
        if (validations.get('isValid')) {
          this.get('session').authenticate('authenticator:token', {
            email,
            password
          })
          .then((result) => {
            this.get('session').set('data.email', email);
            this.get('router').transitionTo('home');
          }).catch(() => {
            this.set('errorMessage', true);
          });
        } else {
          this.set('errors', true);
        }
      });
    }
  }
});
