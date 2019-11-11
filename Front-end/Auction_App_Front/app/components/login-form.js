import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  session: service('session'),
  luser: null,
  errors: false,
  errorMessage: false,
  actions: {
    authenticate() {
      let luser = this.get('luser');
      const email = this.get('email');
      const password = this.get('password');

      set(luser,'email', email); 
      set(luser,'password', password);

      luser.validate()
      .then(({ validations }) => {
        if (validations.get('isValid')) {
          this.get('session').authenticate('authenticator:token', {email, password})
          .then(() => {
            this.get('session').set('data.email', email);
            this.get('router').transitionTo('home');
          }).catch(()=>{
            this.set('errorMessage', true);
          });             
        }else{
          this.set('errors', true);
        }
      });
    }
  }
});