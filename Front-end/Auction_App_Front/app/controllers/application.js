import {inject as service} from '@ember/service';
import Controller from '@ember/controller';
import {getOwner} from '@ember/application';

export default Controller.extend({
  session: service('session'),
  actions: {
    logout() {
      this.get('session').set('data.email', '');
      this.get('session').invalidate();
      getOwner(this).lookup('router:main').transitionTo('login');
    }
  }
});