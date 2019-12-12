import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  wishlistHttp: service(),
  session: service('session'),
  watchListClass: '',
  userEmail: '',
  isWatchListActive: false,
  init() {
    this._super(...arguments);
    this.set('userEmail', this.get('session.data.email'));
    this.get('wishlistHttp').existInWishlist(this.product.id).then((result) => {
      this.set('isWatchListActive', result);
      if (this.get('isWatchListActive') != false) {
        this.set('watchListClass', 'active');
      } else {
        this.set('watchListClass', '');
      }
    });
  },
  actions: {
    setWatchList() {
      var data = JSON.stringify({
        'product': this.product,
        'userEmail': this.get('userEmail')
      });
      if (this.get('isWatchListActive') != false) {
        this.set('watchListClass', '');
        this.set('isWatchListActive', false);
        this.get('wishlistHttp').deleteProductFromWishlist(this.product.id);
      } else {
        this.set('watchListClass', 'active');
        this.set('isWatchListActive', true);
        this.get('wishlistHttp').addToWishlist(data);
      }
    },
  }
});
