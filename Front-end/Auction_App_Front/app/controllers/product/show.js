import Controller from '@ember/controller';
import {inject as service} from '@ember/service';

export default Controller.extend({
  productHttp: service(),
  products: null,
  init() {
    this._super(...arguments);
    this.get('productHttp').getAllProducts().then((result) => {
      this.set('products', result.slice(0, 3));
    })
  }
});