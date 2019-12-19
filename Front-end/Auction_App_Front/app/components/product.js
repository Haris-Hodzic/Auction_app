import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  wishlistHttp: service(),
  session: service('session'),
  watchListClass: '',
  userEmail: '',
  isWatchList: false,
  photo: null,
  init() {
    this._super(...arguments);
    this.set('userEmail', this.get('session.data.email'));
    if (this.product.photo.length > 0) {
      this.set('photo', this.product.photo[0]);
    } else {
      this.set('photo', 'assets/images/noImage.png');
    }
    this.get('wishlistHttp').existInWishlist(this.product.id).then((result) => {
      this.set('isWatchList', result);
      if (this.get('isWatchList')) {
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
      if (this.get('isWatchList')) {
        this.set('watchListClass', '');
        this.set('isWatchList', false);
        this.get('wishlistHttp').deleteProductFromWishlist(this.product.id);
      } else {
        this.set('watchListClass', 'active');
        this.set('isWatchList', true);
        this.get('wishlistHttp').addToWishlist(data);
      }
    },
  }
});
