import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/controller';

export default Controller.extend({
  session: service('session'),
  productHttp: service(),
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