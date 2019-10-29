import JSONAPIAdapter from 'ember-data/adapters/json-api';
import TokenAuthorizerMixin from 'ember-simple-auth-token/mixins/token-authorizer';

export default JSONAPIAdapter.extend(TokenAuthorizerMixin, {
  host: 'http://localhost:8080',
  namespace: 'authentication/login',
  authorizer: 'authorizer:application'
});
