import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  stripe: service('stripev3'),
  model(params) {
    return params;
  },
  beforeModel() {
    return this.get('stripe').load();
  }
});
