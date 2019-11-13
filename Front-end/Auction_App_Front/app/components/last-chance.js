import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  productHttp: service(),
  chances: null,
  pageNumber: '0',
  init() {
    this._super(...arguments);
    this.get('productHttp').loadChances(this.get('pageNumber')).then((result) => {
      this.set('chances', result);
    })
  },
  actions: {
    loadMoreChance() {
      var temp = +this.get('pageNumber') + 1;
      this.set('pageNumber', temp.toString());
      this.get('productHttp').loadChances(this.get('pageNumber')).then((result) => {
        this.set('chances', result);
      })
    }
  }
});