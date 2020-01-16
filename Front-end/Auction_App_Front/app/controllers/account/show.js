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
  isLoadMoreButtonActive: true,
  productHttp: service(),
  userHttp: service(),
  bidHttp: service(),
  wishlistHttp: service(),
  session: service('session'),
  totalNumberOfWishlist: null,
  totalNumberOfBids: null,
  wishlistButtonsList: null,
  isPaymentNotificationActive: false,
  bidsButtonList: null,
  init() {
    this._super(...arguments);
    this.set('wishlistButtonsList', []);
    this.set('bidsButtonsList', []);
    const today = new Date().toJSON().slice(0, 10);
    this.set('activeProductList', []);
    this.set('soldProductList', []);
    this.get('userHttp').getUserInfo(this.get('session.data.email')).then((result) => {
      this.set('userInfo', result);
      this.get('productHttp').getActiveProductsByUserId(this.get('userInfo.id'), 0).then((result) => {
        this.set('activeProductList', result);
        const self = this;
        result.forEach(function(entry, index) {
          const endDate = entry.endDate.slice(0, 10);
          const date1 = new Date(today);
          const date2 = new Date(endDate);
          const differenceTime = date2 - date1;
          const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(self.get('activeProductList')[index], 'timeLeft', differenceDays);
          } else {
            set(self.get('activeProductList')[index], 'timeLeft', 0);
          }
        });
      });
      this.get('productHttp').getSoldProductsByUserId(this.get('userInfo.id'), 0).then((result) => {
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
      this.get('bidHttp').getBidsByUserId(this.get('userInfo.id'), 0).then((result) => {
        this.set('userBids', result.content);
        this.set('totalNumberOfBids', result.totalElements);
        for (var i = 0; i < result.totalElements / 5; i++) {
          this.get('bidsButtonsList').pushObject({
            page: i + 1
          });
        }
        const self = this;
        result.content.forEach(function(entry, index) {
          if (entry.product.status === 'pending') {
            self.set('isPaymentNotificationActive', true);
          }
          const endDate = entry.product.endDate.slice(0, 10);
          const date1 = new Date(today);
          const date2 = new Date(endDate);
          const differenceTime = date2 - date1;
          const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(self.get('userBids')[index], 'timeLeft', differenceDays);
          } else {
            set(self.get('userBids')[index], 'timeLeft', 0);
          }
        });
      });
      this.get('wishlistHttp').getWishlistByUserId(this.get('userInfo.id'), 0).then((result) => {
        this.set('userWishlist', result.content);
        this.set('totalNumberOfWishlist', );
        for (var i = 0; i < result.totalElements / 5; i++) {
          this.get('wishlistButtonsList').pushObject({
            page: i + 1
          });
        }
        const self = this;
        result.content.forEach(function(entry, index) {
          const endDate = entry.product.endDate.slice(0, 10);
          const date1 = new Date(today);
          const date2 = new Date(endDate);
          const differenceTime = date2 - date1;
          const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(self.get('userWishlist')[index], 'timeLeft', differenceDays);
            set(self.get('userWishlist')[index], 'status', 'OPEN');
            set(self.get('userWishlist')[index], 'statusClass', 'open')
          } else {
            set(self.get('userWishlist')[index], 'timeLeft', 0);
            set(self.get('userWishlist')[index], 'status', 'CLOSED');
            set(self.get('userWishlist')[index], 'statusClass', 'closed')
          }
        });
      });
    });
  },
  afterModel() {
    if (this.get('model').option === 'profile') {
      this.send('setProfileView');
    } else if (this.get('model').option === 'seller') {
      this.send('setSellerView');
    } else if (this.get('model').option === 'bids') {
      this.send('setBidsView');
    } else if (this.get('model').option === 'wishlist') {
      this.send('setWishlistView');
    }
  },
  actions: {
    setProfileView() {
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
    setSellerView() {
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
    setBidsView() {
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
    setWishlistView() {
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
    exploreMore(view, page) {
      const today = new Date().toJSON().slice(0, 10);
      const self = this;
      if (view === 'wishlist') {
        this.get('wishlistHttp').getWishlistByUserId(this.get('userInfo.id'), page).then((result) => {
          this.set('userWishlist', result.content);
          result.content.forEach(function(entry, index) {
            const endDate = entry.product.endDate.slice(0, 10);
            const date1 = new Date(today);
            const date2 = new Date(endDate);
            const differenceTime = date2 - date1;
            const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
            if (differenceDays >= 0) {
              set(self.get('userWishlist')[index], 'timeLeft', differenceDays);
              set(self.get('userWishlist')[index], 'status', 'OPEN');
              set(self.get('userWishlist')[index], 'statusClass', 'open')
            } else {
              set(self.get('userWishlist')[index], 'timeLeft', 0);
              set(self.get('userWishlist')[index], 'status', 'CLOSED');
              set(self.get('userWishlist')[index], 'statusClass', 'closed')
            }
          });
        });
      } else if (view === 'bids') {
        this.get('bidHttp').getBidsByUserId(this.get('userInfo.id'), page).then((result) => {
          this.set('userBids', result.content);
          result.content.forEach(function(entry, index) {
            const endDate = entry.product.endDate.slice(0, 10);
            const date1 = new Date(today);
            const date2 = new Date(endDate);
            const differenceTime = date2 - date1;
            const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
            if (differenceDays >= 0) {
              set(self.get('userBids')[index], 'timeLeft', differenceDays);
            } else {
              set(self.get('userBids')[index], 'timeLeft', 0);
            }
          });
        });
      }
    }
  },
  valueObserver: observer('model', function() {
    if (this.get('model').option === 'profile') {
      this.send('setProfileView');
    } else if (this.get('model').option === 'seller') {
      this.send('setSellerView');
    } else if (this.get('model').option === 'bids') {
      this.send('setBidsView');
    } else if (this.get('model').option === 'wishlist') {
      this.send('setWishlistView');
    }
  })
});
