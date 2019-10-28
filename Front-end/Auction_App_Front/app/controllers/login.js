import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Controller.extend({
	session: service('session'),


	actions: {
    	authenticate() {
	     	let {email, password} = this.getProperties('email', 'password');
			this.get('session').authenticate('authenticator:token', {email, password})
			.then((result) => {
        		Ember.getOwner(this).lookup('router:main').transitionTo('home');       
     		}).catch((reason)=>{
				this.set('errorMessage', reason.error);
		    });   
		}		
	}
});
