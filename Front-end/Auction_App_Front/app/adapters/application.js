import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
	host: 'http://localhost:8080',
	namespace: 'authentication/login',
	authorizer: 'authorizer:application'
});