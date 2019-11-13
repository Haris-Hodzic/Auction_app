import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  productHttp: service(),
  pageNumber: '0',
  arrivals: null,
  init() {
    this._super(...arguments);
    this.get('productHttp').loadArrivals(this.get('pageNumber')).then((result) => {
      this.set('arrivals', result);
    })
  },
  actions: {
    loadMore() {
      var temp = +this.get('pageNumber') + 1;
      this.set('pageNumber', temp.toString());
      this.get('productHttp').loadArrivals(this.get('pageNumber')).then((result) => {
        this.set('arrivals', result);
      })
    }
  }
});