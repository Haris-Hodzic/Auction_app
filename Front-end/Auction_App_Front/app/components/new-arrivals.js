import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  productHttp: service(),
  arrivals: null,
  buttonsList: null,
  init() {
    this._super(...arguments);
    this.set('buttonsList',[]);
    this.get('productHttp').getArrivals('0').then((result) => {
      this.set('arrivals', result);
    })
    for (var i = 0; i < this.get('products.length')/8; i++) {
      this.get('buttonsList').pushObject({page: i+1});
    }
  },
  actions: {
    loadMore(page) {
      this.get('productHttp').getArrivals(page).then((result) => {
        this.set('arrivals', result);
      })
    }
  }
});