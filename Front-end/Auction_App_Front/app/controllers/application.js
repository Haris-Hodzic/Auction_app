import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/controller';
import { later } from '@ember/runloop';

export default Controller.extend({
  session: service('session'),
  productHttp: service(),
  client: service('socket-connection'),
  search: '',
  shopController: inject('shop'),
  shopModel: alias('shopController.model'),
  shopFilters: alias('shopController.filters'),
  isAccountActive: false,
  isProfileButtonActive: false,
  isSellerButtonActive: false,
  isBidsButtonActive: false,
  isWishlistButtonActive: false,
  profileActiveClass: '',
  sellerActiveClass: '',
  bidsActiveClass: '',
  wishlistActiveClass: '',
  userEmail: null,
  init() {
    this._super(...arguments);
    var now = new Date();
    this.set('userEmail', this.get('session.data.email'));
    //this.get('client').connectAuction();
    this.get('productHttp').getActiveProducts().then((result) => {
      var _this = this;
      result.forEach(function(entry) {
        let year = entry.endDate.slice(0, 4);
        let month = parseInt(entry.endDate.slice(5, 7)) - 1;
        let date = entry.endDate.slice(8, 10);
        let hour = parseInt(entry.endDate.slice(11, 13)) + 1;
        let minute = entry.endDate.slice(14, 16);
        let second = entry.endDate.slice(17, 19);
        let milisecond = entry.endDate.slice(20, 23);
        if (hour === 24) {
          hour = 0;
        }
        let ccdate = new Date(year, month, date, hour, minute, second, milisecond)
        var millisTill10 = ccdate - now;
        if (millisTill10 < 0) {
          millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
        }
        later(function() {
          if (entry.highestBidder) {
            console.log(entry)
            //_this.get('client').sendMessage(entry.highestBidder, entry.id);
            console.log(_this.get('client').messages)
          }

        }, millisTill10);
      })
    });
  },
  actions: {
    logout() {
      this.get('session').set('data.email', '');
      this.get('session').invalidate();
      getOwner(this).lookup('router:main').transitionTo('login');
    },
    searchProducts() {
      this.transitionToRoute('shop');
      set(this.get('shopFilters'), 'searchString', this.get('search'));
      this.get('productHttp').filterProductsBySubcategory(this.get('shopFilters')).then((result) => {
        this.set('shopModel', result);
      });
    },
    myAccount() {
      if (this.get('isAccountActive')) {
        this.set('isAccountActive', false);
      } else {
        this.set('isAccountActive', true);
      }
    },
    setProfileView() {
      this.set('isProfileButtonActive', true);
      this.set('profileActiveClass', 'active');
      this.set('isSellerButtonActive', false);
      this.set('sellerActiveClass', '');
      this.set('isBidsButtonActive', false);
      this.set('bidsActiveClass', '');
      this.set('isWishlistButtonActive', false);
      this.set('wishlistActiveClass', '');
      this.set('isAccountActive', false);
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
      this.set('isAccountActive', false);
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
      this.set('isAccountActive', false);
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
      this.set('isAccountActive', false);
      this.transitionToRoute('account.show', "wishlist");
    }
  }
});
