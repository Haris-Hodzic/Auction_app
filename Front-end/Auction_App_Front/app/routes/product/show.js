import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  productHttp: service(),
  model(params) {
    return this.get('productHttp').getProduct(params);
  }
});