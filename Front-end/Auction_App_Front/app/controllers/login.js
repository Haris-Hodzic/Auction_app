import Ember from 'ember';
import { inject as service } from '@ember/service';
import { validator, buildValidations } from 'ember-cp-validations';

export default Ember.Controller.extend({
	session: service('session'),
	user: null,
	actions: {
		authenticate() {
			let {email, password} = this.getProperties('email', 'password');

			const loginUser = this.store.createRecord('login-user', {
				email: email,
				password: password
			});

			loginUser.validate()
			.then(({ validations }) => {

				if (validations.get('isValid')) {
					console.log("successful")
					this.get('session').authenticate('authenticator:token', {email, password})
					.then((result) => {
				//user.save(email, password);
				Ember.getOwner(this).lookup('router:main').transitionTo('home');       
			}).catch((reason)=>{
				this.set('errorMessage', reason.error);
			});   	
		}
		else{
			console.log("Error:");
		}
	});



		}	
	}
});