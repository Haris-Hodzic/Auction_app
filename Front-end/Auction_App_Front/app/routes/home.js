import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  productHttp: service(),
  model() {
    return this.get('productHttp').getAllProducts();
  }
});
