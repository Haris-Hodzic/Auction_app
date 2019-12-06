import Component from '@ember/component';
import {inject as service} from '@ember/service';
import FindQuery from 'ember-emberfire-find-query/mixins/find-query';

export default Component.extend(FindQuery, {
  bidHttp: service(),
  client: service('socket-connection'),
  message: "",
  store: service(),
  notifications: service('notification-messages'),
  productHttp: service(),
  wishlistHttp: service(),
  session: service('session'),
  timeLeft: null,
  isWatchListActive: false,
  watchListClass: 'wlInactive',
  currentPhoto: null,
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
  product: null,
  currentPath: null,
  isCountdownTimerActive: false,
  init() {
    this._super(...arguments);
    this.get('client').connect();
    this.set('currentPath', location.href.slice(location.href.indexOf(location.pathname)));
    if (this.get('session.previousRouteName') !== this.get('currentPath')) {
      this.store.query('view', {
        filter: {
          productId: this.productId
        }
      }).then((result) => {
        if (result.length === 0) {
          var view = this.store.createRecord('view',{
            productId: this.productId,
            numberOfViews: 1
          });
          view.save();
        } else {
          var productView = result.get('firstObject');
          productView.set('numberOfViews', productView.numberOfViews + 1);
          productView.save();
        }
      });
    }
    this.get('productHttp').getProduct(this.productId).then((result) => {
      this.set('product', result);
      if (result.photo.length > 0) {
        this.set('currentPhoto', result.photo[0]);
      } else {
        this.set('currentPhoto', 'assets/images/noImage.png');
      }
      const today = new Date().toJSON().slice(0, 10);
      const endDate = result.endDate.slice(0, 10);
      const ownerEmail = result.user.email;
      const date1 = new Date(today);
      const date2 = new Date(endDate);
      const differenceTime = date2 - date1;
      const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));

      const currentTime = new Date().toJSON().slice(11, 19);
      const endTime = result.endDate.slice(11, 19);
      const timeStart = new Date(today + ' ' + currentTime).getHours();
      const timeEnd = new Date(endDate + ' ' + endTime).getHours();
      const hourDifference = timeEnd - timeStart; 
      if (differenceDays > 0) {
        this.set('isCountdownTimerActive', false);
        this.set('timeLeft', differenceDays + ' days');
      } else if (differenceDays === 0 && hourDifference === 0) {
        this.set('isCountdownTimerActive', true);
      } else if (differenceDays === 0 && hourDifference > 0) {
        this.set('timeLeft', hourDifference + ' hours');
      } else {
        this.set('timeLeft', 'Sold')
      }

      this.set('bidderEmail', this.get('session.data.email'));
      this.get('wishlistHttp').existInWishlist(result.id).then((result)=> {
        this.set('isWatchListActive', result);
        if (this.get('isWatchListActive')) {
          this.set('watchListClass', 'wlActive');
        } else {
          this.set('watchListClass', 'wlInactive');
        }
      });
      this.get('bidHttp').getSingleBid(result.id).then((result) => {
        this.set('singleProduct', result);
      });
      if (this.get('session.data.email') === ownerEmail) {
        this.set('owner', true);
      } else {
        this.set('owner', false);
      }
    });
  },
  willDestroyElement() {
    this.store.query('view', {
      filter: {
        productId: String(this.get('product.id'))
      }
    }).then(function(result) {
      var productView = result.get("firstObject");
      productView.set('numberOfViews', productView.numberOfViews - 1);
      productView.save();
    });
  },
  actions: {
    setWatchList() {
      var data = JSON.stringify({
        'product': this.product,
        'userEmail': this.get('bidderEmail')
      });
      if (this.get('isWatchListActive')) {
        this.set('watchListClass', 'wlInactive');
        this.set('isWatchListActive', false);
        this.get('wishlistHttp').deleteProductFromWishlist(this.product.id);
      } else {
        this.set('watchListClass', 'wlActive');
        this.set('isWatchListActive', true);
        this.get('wishlistHttp').addToWishlist(data);
      }
    },
    setPhoto(num) {
      this.set('currentPhoto', this.get('product.photo')[num]);
    },
    placeBid() {
      if (this.get('session.isAuthenticated')) {
        const price = this.get('price');
        const date = new Date().toJSON().slice(0, 10);
        const data = JSON.stringify({
          'price': price,
          'date': date,
          'product': this.product,
          'userEmail': this.get('bidderEmail')
        });
        if (!this.get('owner')) {
          this.get('bidHttp').createBid(data).then((result) => {
            if (!result) {
              this.set('error', true);
            } else {
              this.set('bidTry', true);
              this.get('client').sendMessage(this.get('session.data.email'), this.productId);
              this.get('productHttp').getProduct(this.product.id).then((result) => {
                this.set('product', result);
              });
              this.set('error', false);
            }
          })
        }
      }
    }
  }
});