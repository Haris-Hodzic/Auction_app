import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
	session: service('session'),
	actions: {
		logout() {
			this.get('session').invalidate();
			Ember.getOwner(this).lookup('router:main').transitionTo('login');       
		}		
	}
});