import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  productHttp: service(),
  sellerActiveButtonClass: 'active',
  sellerSoldButtonClass: '',
  isSellerActiveButtonActive: true,
  isSellerSoldButtonActive: false,
  init() {
    this._super(...arguments);
  },
  actions: {
    setSellerView() {
      if (this.get('isSellerActiveButtonActive')) {
        this.set('isSellerActiveButtonActive', false);
        this.set('sellerActiveButtonClass', '');
        this.set('isSellerSoldButtonActive', true);
        this.set('sellerSoldButtonClass', 'active');
      } else {
        this.set('isSellerActiveButtonActive', true);
        this.set('sellerActiveButtonClass', 'active');
        this.set('isSellerSoldButtonActive', false);
        this.set('sellerSoldButtonClass', '');
      }
    }
  }
});
