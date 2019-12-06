import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  bidHttp: service(),
  productHttp: service(),
  wishlistHttp: service(),
  session: service('session'),
  timeLeft: null,
  isWatchListActive: false,
  watchListClass: 'wlInactive',
  currentPhoto: '0',
  owner: false,
  bidderEmail: '',
  currentProduct: null,
  error: false,
  errorMessage: 'There are higher bids than yours. You could give a second try!',
  successfulBidMessage: 'Congrats! You are the higest bider!',
  isOwnerMessage: 'You are the seller of this product!',
  notAuthenticatedMessage: 'You need to log in to place a bid!',
  bidTry: false,
  singleProduct: null,
  init() {
    this._super(...arguments);
    let today = new Date().toJSON().slice(0, 10);
    let endDate = this.product.endDate.slice(0, 10);
    let todayDay = today.slice(8, 10);
    let endDateDay = endDate.slice(8, 10);
    let endDateMonth = endDate.slice(5, 7);
    let todayMonth = today.slice(5, 7);
    let ownerEmail = this.product.user.email;
    this.set('bidderEmail', this.get('session.data.email'));

    this.get('wishlistHttp').existInWishlist(this.product).then((result)=> {
      this.set('isWatchListActive', result);
      if (this.get('isWatchListActive') != false) {
        this.set('watchListClass', 'wlActive');
      } else {
        this.set('watchListClass', 'wlInactive');
      }
    });
    this.get('bidHttp').getSingleBid(this.product.id).then((result) => {
      this.set('singleProduct', result);
    });
    if ((endDateMonth - todayMonth) > 0) {
      this.set('timeLeft', (endDateMonth - todayMonth) + ' months and ' + (endDateDay - todayDay) + ' days');
    } else if ((endDateMonth - todayMonth) == 0) {
      this.set('timeLeft', (endDateDay - todayDay) + ' days');
    } else {
      this.set('timeLeft', 'finished');
    }
    if (this.get('session.data.email') === ownerEmail) {
      this.set('owner', true);
    } else {
      this.set('owner', false);
    }
  },
  actions: {
    setWatchList() {
      var data = JSON.stringify({
        'product': this.product,
        'userEmail': this.get('bidderEmail')
      });
      if (this.get('isWatchListActive') != false) {
        this.set('watchListClass', 'wlInactive');
        this.set('isWatchListActive', false);
        this.get('wishlistHttp').deleteProductFromWishlist(this.product);
      } else {
        this.set('watchListClass', 'wlActive');
        this.set('isWatchListActive', true);
        this.get('wishlistHttp').addToWishlist(data);
      }
    },
    setPhoto(num) {
      this.set('currentPhoto', num);
    },
    placeBid() {
      this.set('bidTry', true);
      if (this.get('session.isAuthenticated') === true) {
        const price = this.get('price');
        const date = new Date().toJSON().slice(0, 10);
        const data = JSON.stringify({
          'price': price,
          'date': date,
          'product': this.product,
          'userEmail': this.get('bidderEmail')
        });
        this.get('bidHttp').createBid(data).then((result) => {
          if (result === false) {
            this.set('error', true);
          } else {
            this.get('productHttp').getProduct({product_id: this.get('product.id')}).then((result) => {
              this.set('product', result);
            });
            this.set('error', false);
          }
        })
      }
    }
  }
});
