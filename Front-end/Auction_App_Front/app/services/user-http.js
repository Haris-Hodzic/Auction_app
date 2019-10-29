import Ember from 'ember';
import { inject as service } from '@ember/service';
const AUTHENTICATOR = 'authenticator:oauth2';
export default Ember.Service.extend({


	httpBase: service(),
	session: service('session'),

	register(data, authenticator) {

		this.get('httpBase').ajaxReq('http://localhost:8080/authentication/register', data, 'POST');
  		//this.get('session').authenticate(authenticator, {firstName, lastName, email, password});
  	},

  	listUsers(data, authenticator){
  		this.get('httpBase').ajaxReq('http://localhost:8080/authentication/test', data, 'GET');
  	}

  });			