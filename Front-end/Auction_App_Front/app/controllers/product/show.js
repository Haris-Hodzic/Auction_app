import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import { observer } from '@ember/object';

export default Controller.extend({
  productHttp: service(),
  products: null,
  viewss:null,
  init() {
    this._super(...arguments);
    this.get('productHttp').getAllProducts().then((result) => {
      this.set('products', result.slice(0, 3));
    });
  },
  valueObserver: observer('model', function() {
    console.log(this.get('model.numberOfViews').get("firstObject").numberOfViews)
    this.set('viewss', this.get('model.numberOfViews').get("firstObject").numberOfViews)
    console.log('changed'+this.get('numberOfViews'))
  })
});
