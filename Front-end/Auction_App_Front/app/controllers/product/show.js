import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  httpBase: service(),
  session: service('session'),
  products: null,
  init() {
    this._super(...arguments);
    this.get('httpBase').ajaxReq('http://localhost:8080/api', '', 'GET').then((result) => {
      this.set('products', result.slice(0,3));
    });
  }
});