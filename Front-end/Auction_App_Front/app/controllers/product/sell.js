import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';

export default Controller.extend({
  productHttp: service(),
  store: service(),
  userHttp: service(),
  session: service(),
  categoryHttp: service(),
  stripeHttp: service(),
  stripev3: service(),
  notifications: service('notification-messages'),
  userInfo: null,
  billingInformation: null,
  productPartThree: null,
  cardName: '',
  product: null,
  categoryName: null,
  subcategoryName: null,
  subcategories: null,
  isProfileCard: true,
  currentDate: null,
  isPhotoErrorActive: false,
  isCategoryButtonActive: false,
  isSubcategoryButtonActive: false,
  productPartOne: null,
  productPartTwo: null,
  isPartOneActive: true,
  isPartTwoActive: false,
  isPartThreeActive: false,
  errors: false,
  photosError: false,
  dateError: false,
  init() {
    this._super(...arguments);
    this.set('productPartOne', this.get('store').createRecord('productPartOne'));
    this.set('productPartTwo', this.get('store').createRecord('productPartTwo'));
    this.set('productPartThree', this.get('store').createRecord('billingInformation'));
    this.set('billingInformation', {
      'street': null,
      'country': null,
      'city': null,
      'zip': null,
      'phone': null
    });
    this.set('product', {
      'name': null,
      'description': null,
      'startPrice': null,
      'startDate': null,
      'endDate': null,
      'shipping': false,
      'photo': [],
      'user': null,
      'category': null,
      'subcategory': null
    });
    this.get('userHttp').getUserInfo(this.get('session.data.email')).then((result) => {
      set(this.get('product'), 'user', result);
      this.set('userInfo', result);
    });
    this.set('currentDate', new Date());
    if (this.get('currentDate').getMonth() > 8) {
      set(this.get('product'), 'startDate', this.get('currentDate').getFullYear() + '-' + (parseInt(this.get('currentDate').getMonth()) + 1) + '-' + this.get('currentDate').getDate());
      set(this.get('product'), 'endDate', this.get('currentDate').getFullYear() + '-' + (parseInt(this.get('currentDate').getMonth()) + 1) + '-' + this.get('currentDate').getDate());
    } else {
      set(this.get('product'), 'startDate', this.get('currentDate').getFullYear() + '-' + '0' + (parseInt(this.get('currentDate').getMonth()) + 1) + '-' + this.get('currentDate').getDate());
      set(this.get('product'), 'endDate', this.get('currentDate').getFullYear() + '-' + '0' + (parseInt(this.get('currentDate').getMonth()) + 1) + '-' + this.get('currentDate').getDate());
    }
    this.set('subcategories', {
      Women: [],
      Men: [],
      Kids: [],
      Accesorise: [],
      Home: [],
      Art: [],
      Computer: []
    });
  },
  actions: {
    uploadImage(file) {
      let self = this;
      file.readAsDataURL().then(function(url) {
        if (self.get('product.photo').length < 4) {
          self.get('product.photo').pushObject(url);
        } else {
          self.set('isPhotoErrorActive', true);
        }
      })
    },
    setDropdownActive(dropdownButton) {
      if (dropdownButton === 'category') {
        if (this.get('isCategoryButtonActive')) {
          this.set('isCategoryButtonActive', false);
        } else {
          this.set('isCategoryButtonActive', true);
        }
      } else if (dropdownButton === 'subcategory') {
        this.get('productHttp').getProductSubcategories(this.get('categoryName')).then((result) => {
          set(this.get('subcategories'), this.get('categoryName'), result);
          if (this.get('isSubcategoryButtonActive')) {
            this.set('isSubcategoryButtonActive', false);
          } else {
            this.set('isSubcategoryButtonActive', true);
          }
        });
      }
    },
    setCategory(category) {
      this.set('categoryName', category);
      this.get('categoryHttp').getCategoryByName(category).then((result) => {
        set(this.get('product'), 'category', result);
      });
      this.set('isCategoryButtonActive', false);
    },
    setSubcategory(subcategory) {
      this.set('subcategoryName', subcategory);
      this.get('categoryHttp').getCategoryByName(subcategory).then((result) => {
        set(this.get('product'), 'subcategory', result);
      });
      this.set('isSubcategoryButtonActive', false);
    },
    next(view) {
      if (view === 'one') {
        let productOne = this.get('productPartOne');
        set(productOne, 'name', this.get('product.name'));
        set(productOne, 'category', this.get('categoryName'));
        set(productOne, 'subcategory', this.get('subcategoryName'));
        set(productOne, 'description', this.get('product.description'));
        productOne.validate()
          .then(({
            validations
          }) => {
            if (validations.get('isValid')) {
              if (this.get('product.photo').length >= 3) {
                this.set('isPartOneActive', false);
                this.set('isPartTwoActive', true);
              } else {
                this.set('photosError', true);
                this.set('errors', true);
              }
            } else {
              this.set('errors', true);
              if (this.get('product.photo').length < 3) {
                this.set('photosError', true);
                this.set('errors', true);
              }
            }
          });
      } else if (view === 'two') {
        let productTwo = this.get('productPartTwo');
        set(productTwo, 'startPrice', this.get('product.startPrice'));
        set(productTwo, 'startDate', this.get('product.startDate'));
        set(productTwo, 'endDate', this.get('product.endDate'));
        productTwo.validate()
          .then(({
            validations
          }) => {
            if (validations.get('isValid')) {
              if (this.get('product.endDate') <= this.get('product.startDate')) {
                this.set('dateError', true);
              } else {
                this.set('isPartTwoActive', false);
                this.set('isPartThreeActive', true);
              }
            } else {
              this.set('errors', true);
            }
          });
      }
    },
    back(view) {
      if (view === 'two') {
        this.set('isPartTwoActive', false);
        this.set('isPartOneActive', true);
      } else if (view === 'three') {
        this.set('isPartThreeActive', false);
        this.set('isPartTwoActive', true);
      }
    },
    startAuction(stripeElement) {
      if (this.get('product.shipping')) {
        let productThree = this.get('productPartThree');
        set(productThree, 'address', this.get('billingInformation.street'));
        set(productThree, 'country', this.get('billingInformation.country'));
        set(productThree, 'city', this.get('billingInformation.city'));
        set(productThree, 'zip', this.get('billingInformation.zip'));
        set(productThree, 'phone', this.get('billingInformation.phone'));
        productThree.validate()
          .then(({
            validations
          }) => {
            if (validations.get('isValid')) {
              if (this.get('isProfileCard') && this.get('userInfo.userCard')) {
                let data = {
                  'street': this.get('billingInformation.street'),
                  'city': this.get('billingInformation.city'),
                  'zipCode': this.get('billingInformation.zip'),
                  'country': this.get('billingInformation.country')
                };
                this.get('stripeHttp').chargeCard(this.get('userInfo.userCard.customerId'), 10, -1, data);
              } else if (!this.get('isProfileCard')) {
                let stripe = get(this, 'stripev3');
                let data = {
                  name: this.get('cardName'),
                  address_line1: this.get('billingInformation.street'),
                  address_city: this.get('billingInformation.city'),
                  address_zip: this.get('billingInformation.zip'),
                  address_country: this.get('billingInformation.country')
                };
                stripe.createToken(stripeElement, data).then((result) => {
                  this.get('stripeHttp').chargeByToken(result.token.id, 10, -1);
                });
              }
              this.get('productHttp').createProduct(JSON.stringify(this.get('product'))).then((result) => {
                if (result) {
                  this.get('notifications').success('You successfully created the auction for ' + this.get('product.name'), {
                    autoClear: true,
                    clearDuration: 4400
                  });
                  this.transitionToRoute('shop');
                }
              });
            } else {
              this.set('errors', true);
            }
          });
      } else {
        this.get('productHttp').createProduct(JSON.stringify(this.get('product'))).then((result) => {
          if (result) {
            this.get('notifications').success('You successfully created the auction for ' + this.get('product.name'), {
              autoClear: true,
              clearDuration: 4400
            });
            this.transitionToRoute('shop');
          }
        });
      }
    },
    setCard() {
      if (this.get('isProfileCard')) {
        this.set('isProfileCard', false);
      } else {
        this.set('isProfileCard', true);
      }
    },
    setShipping() {
      if (this.get('product.shipping')) {
        set(this.get('product'), 'shipping', false);
      } else {
        set(this.get('product'), 'shipping', true);
      }
    },
    removePhoto(index) {
      set(this.get('product'), 'photo', this.get('product.photo').splice(0, index).concat(this.get('product.photo').slice(index + 1)));
      this.set('isPhotoErrorActive', false);
    }
  }
});
