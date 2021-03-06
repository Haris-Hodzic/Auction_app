import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  productHttp: service(),
  chances: null,
  buttonsList: null,
  init() {
    this._super(...arguments);
    this.set('buttonsList',[]);
    this.get('productHttp').getChances('0').then((result) => {
      this.set('chances', result);
    })
    for (var i = 0; i < this.get('products.length')/8; i++) {
      this.get('buttonsList').pushObject({page: i+1});
    }
  },
  actions: {
    loadMoreChance(page) {
      this.get('productHttp').getChances(page).then((result) => {
        this.set('chances', result);
      })
    }
  }
});