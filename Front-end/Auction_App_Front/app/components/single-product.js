import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  bidHttp: service(),
  session: service('session'),
  endDate: null,
  endDateDay: null,
  endDateMonth: null,
  today: null,
  todayDay: null,
  todayMonth: null,
  timeLeft: null,
  watchList: 'wl',
  currentPhoto: '0',
  user: null,
  owner: false,
  price: 0,
  bidderEmail: '',
  currentProduct: null,
  data: null,
  error: false,
  errorMessage: 'There are higher bids than yours. You could give a second try!',
  successfulBid: 'Congrats! You are the higest bider!',
  isOwnerMessage: 'You are the seller of this product!',
  bidTry: false,
  singleProduct: null,
  notAuthenticatedMessage: 'You need to log in to place a bid!',
  init() {
    this._super(...arguments);
    let today = new Date().toJSON().slice(0, 10);
    let endDate = this.product.endDate.slice(0, 10);
    let todayDay = today.slice(8, 10);
    let endDateDay = endDate.slice(8, 10);
    let endDateMonth = endDate.slice(5, 7);
    let todayMonth = today.slice(5, 7);
    let user = this.product.user.email;

    this.get('bidHttp').getSingleBid(this.product.id).then((result) => {
      this.set('singleProduct', result);
    })
    if ((endDateMonth - todayMonth) > 0) {
      this.set('timeLeft', (endDateMonth - todayMonth) + ' months and ' + (endDateDay - todayDay) + ' days');
    } else if ((endDateMonth - todayMonth) == 0) {
      this.set('timeLeft', (endDateDay - todayDay) + ' days');
    } else {
      this.set('timeLeft', 'finished');
    }
    if (this.get('session.data.email') === user) {
      this.set('owner', true);
    } else {
      this.set('owner', false);
    }
  },
  actions: {
    setWatchList() {
      if (this.get('watchList') != 'wl') {
        this.set('watchList', 'wl');
      } else {
        this.set('watchList', 'wlActive');
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
        let bidderEmail = this.get('session.data.email');
        let currentProduct = this.product;
        const data = JSON.stringify({
          'price': price,
          'date': date,
          'product': currentProduct,
          'userEmail': bidderEmail
        });
        this.get('bidHttp').createBid(data).then((result) => {
          if (result.price === null) {
            this.set('error', true);
          } else {
            this.set('error', false);
          }
        })
      }
    }
  }
});