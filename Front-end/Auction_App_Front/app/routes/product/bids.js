import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  stripe: service('stripev3'),
  productHttp: service(),
  session: service(),
  model(params) {
    return this.get('productHttp').getProduct(params.product_id);
  },
  beforeModel() {
    return this.get('stripe').load();
  }
});
