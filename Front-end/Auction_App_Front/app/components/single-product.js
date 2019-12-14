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
  product: null,
  currentPath: null,
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
        }else {
          var productView = result.get('firstObject');
          productView.set('numberOfViews', productView.numberOfViews + 1);
          productView.save();
        }
      });
    }
    this.get('productHttp').getProduct(this.productId).then((result) => {
      this.set('product', result);
      let today = new Date().toJSON().slice(0, 10);
      let endDate = result.endDate.slice(0, 10);
      let todayDay = today.slice(8, 10);
      let endDateDay = endDate.slice(8, 10);
      let endDateMonth = endDate.slice(5, 7);
      let todayMonth = today.slice(5, 7);
      let ownerEmail = result.user.email;
      this.set('bidderEmail', this.get('session.data.email'));
      this.get('wishlistHttp').existInWishlist(result).then((result)=> {
        this.set('isWatchListActive', result);
        if (this.get('isWatchListActive') != false) {
          this.set('watchListClass', 'wlActive');
        } else {
          this.set('watchListClass', 'wlInactive');
        }
      });
      this.get('bidHttp').getSingleBid(result.id).then((result) => {
        this.set('singleProduct', result);
      });
      if ((endDateMonth - todayMonth) > 0) {
        this.set('timeLeft', (endDateMonth - todayMonth) + ' months and ' + (endDateDay - todayDay) + ' days');
      } else if ((endDateMonth - todayMonth) == 0) {
        this.set('timeLeft', (endDateDay - todayDay) + ' days');
      } else {
        this.set('timeLeft', 'finished');
      }
    });*/
    /*this.get('store').findRecord('view', this.product.id).then(function(result) {
      result.set('numberOfViews', result.numberOfViews + 1);
      result.save();
    }).catch(function(){
      var view = self.store.createRecord('view',{
          id: self.product.id,
          numberOfViews: 1
        });
        view.save();
    });*/

    this.set('bidderEmail', this.get('session.data.email'));

    this.get('wishlistHttp').existInWishlist(this.product.id).then((result)=> {
      this.set('isWatchListActive', result);
      if (this.get('isWatchListActive') != false) {
        this.set('watchListClass', 'wlActive');
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
      if (this.get('isWatchListActive') != false) {
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
        if (this.get('owner') === false) {
        this.get('bidHttp').createBid(data).then((result) => {
          if (result === false) {
            this.set('error', true);
          } else {
            this.get('client').sendMessage(this.get('session.data.email'), this.productId);
            var cll = this.get('client.messages')
            console.log(cll)
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
