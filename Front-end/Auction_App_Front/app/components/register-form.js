import { inject as service } from '@ember/service';
import Ember from 'ember';

export default Ember.Component.extend({
	userHttp: service(),

	  actions: {
	    register() {
	    	const firstName = this.get('firstName');
	    	const lastName = this.get('lastName');
	    	const email = this.get('email');
	    	const password = this.get('password');
		    const data = JSON.stringify({'firstName':firstName,'lastName': lastName,'email': email, 'password': password});
		    console.log(data);
		    const authenticator = 'simple-auth-authorizer:token';
		    this.get('userHttp').register(data, authenticator);
	    }
	}
});
