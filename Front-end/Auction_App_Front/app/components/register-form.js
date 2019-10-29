import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { defineProperty } from '@ember/object';
import { validator, buildValidations } from 'ember-cp-validations';

export default Component.extend({
	user: null,
	userHttp: service(),
	store: Ember.inject.service(),
	actions: {
		register() {
			const firstName = this.get('firstName');
			const lastName = this.get('lastName');
			const email = this.get('email');
			const password = this.get('password');
			const data = JSON.stringify({'firstName':firstName,'lastName': lastName,'email': email, 'password': password});

			const user = this.store.createRecord('user', {
				firstName: firstName,
				lastName: lastName,
				email: email,
				password: password
			});



			user.validate()
			.then(({ validations }) => {

				if (validations.get('isValid')) {
					const authenticator = 'simple-auth-authorizer:token';
		    //this.get('userHttp').register(data, authenticator);
		  }
		  else{
		  	console.log('error')
		  }

		});

		}
	}
});