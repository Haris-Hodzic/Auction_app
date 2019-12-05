import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';


export default Controller.extend({
  userInfo: null,
  userProducts: null,
  userBids: null,
  userWishlist: null,
  timeLeft: null,
  pageSize: 5,
  activeProductList: null,
  soldProductList: null,
  productHttp: service(),
  userHttp: service(),
  bidHttp: service(),
  wishlistHttp: service(),
  session: service('session'),
  init() {
    this._super(...arguments);
    let today = new Date().toJSON().slice(0, 10);
    this.set('activeProductList', []);
    this.set('soldProductList', []);
    this.get('userHttp').getUserInfo(this.get('session.data.email')).then((result) => {
      this.set('userInfo', result);
      this.get('productHttp').getActiveProductsByUserId(this.get('userInfo.id'), 5).then((result) => {
        this.set('activeProductList', result);
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('activeProductList')[i], 'timeLeft', differenceDays);
          } else {
            set(this.get('activeProductList')[i], 'timeLeft', 0);
          }
        }
      });
      this.get('productHttp').getSoldProductsByUserId(this.get('userInfo.id'), 5).then((result) => {
        this.set('soldProductList', result);
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('soldProductList')[i], 'timeLeft', differenceDays);
          } else {
            set(this.get('soldProductList')[i], 'timeLeft', 0);
          }
        }
      });
      this.get('bidHttp').getBidsByUserId(this.get('userInfo.id'), 5).then((result) => {
        this.set('userBids', result);
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].product.endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('userBids')[i], 'timeLeft', differenceDays);
          } else {
            set(this.get('userBids')[i], 'timeLeft', 0);
          }
        }
      });
      this.get('wishlistHttp').getWishlistByUserId(this.get('userInfo.id'), 5).then((result) => {
        this.set('userWishlist', result);
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].product.endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('userWishlist')[i], 'timeLeft', differenceDays);
          } else {
            set(this.get('userWishlist')[i], 'timeLeft', 0);
          }
        }
      });
    });
  },
  actions: {
    setProfileView(){
      this.set('isProfileButtonActive', true);
      this.set('profileActiveClass', 'active');
      this.set('isSellerButtonActive', false);
      this.set('sellerActiveClass', '');
      this.set('isBidsButtonActive', false);
      this.set('bidsActiveClass', '');
      this.set('isWishlistButtonActive', false);
      this.set('wishlistActiveClass', '');
      this.transitionToRoute('account.show', "profile");
    },
    setSellerView(){
      this.set('isProfileButtonActive', false);
      this.set('profileActiveClass', '');
      this.set('isSellerButtonActive', true);
      this.set('sellerActiveClass', 'active');
      this.set('isBidsButtonActive', false);
      this.set('bidsActiveClass', '');
      this.set('isWishlistButtonActive', false);
      this.set('wishlistActiveClass', '');
      this.transitionToRoute('account.show', "seller");
    },
    setBidsView(){
      this.set('isProfileButtonActive', false);
      this.set('profileActiveClass', '');
      this.set('isSellerButtonActive', false);
      this.set('sellerActiveClass', '');
      this.set('isBidsButtonActive', true);
      this.set('bidsActiveClass', 'active');
      this.set('isWishlistButtonActive', false);
      this.set('wishlistActiveClass', '');
      this.transitionToRoute('account.show', "bids");
    },
    setWishlistView(){
      this.set('isProfileButtonActive', false);
      this.set('profileActiveClass', '');
      this.set('isSellerButtonActive', false);
      this.set('sellerActiveClass', '');
      this.set('isBidsButtonActive', false);
      this.set('bidsActiveClass', '');
      this.set('isWishlistButtonActive', true);
      this.set('wishlistActiveClass', 'active');
      this.transitionToRoute('account.show', "wishlist");  
    },
  },
  valueObserver: observer('model', function() {
    if (this.get('model').option === 'profile') {
      this.send('setProfileView');
    } else if(this.get('model').option === 'seller') {
      this.send('setSellerView');
    }else if (this.get('model').option === 'bids') {
      this.send('setBidsView');
    }else if (this.get('model').option === 'wishlist') {
      this.send('setWishlistView');
    }
  })
});
