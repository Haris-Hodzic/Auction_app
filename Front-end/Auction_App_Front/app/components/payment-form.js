import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';
import EmberObject from '@ember/object';

export default Component.extend({
  stripeHttp: service(),
  stripev3: service(),
  userHttp: service(),
  store: service(),
  billingInformation: null,
  cardName: '',
  isProfileCard: true,
  showRating: false,
  rating: null,
  productThree: null,
  ratingError: false,
  errors: false,
  init() {
    this._super(...arguments);
    this.set('productThree', this.get('store').createRecord('billingInformation'));
    this.set('billingInformation', {
      'street': '',
      'country': null,
      'city': '',
      'zip': '',
      'phone': ''
    });
  },
  actions: {
    setCard() {
      this.toggleProperty('isProfileCard');
    },
    setAddress() {
      set(this.get('productThree'), 'address', this.get('billingInformation.street'));
      set(this.get('productThree'), 'country', this.get('billingInformation.country'));
      set(this.get('productThree'), 'city', this.get('billingInformation.city'));
      set(this.get('productThree'), 'zip', this.get('billingInformation.zip'));
      set(this.get('productThree'), 'phone', this.get('billingInformation.phone'));
    },
    payWithCard() {
      this.triggerAction({
        action:'setAddress',
        target: this
      });
      this.get('productThree').validate()
      .then(({
        validations
      }) => {
        if (validations.get('isValid')) {
          let data = {
            'street': this.get('billingInformation.street'),
            'city': this.get('billingInformation.city'),
            'zipCode': this.get('billingInformation.zip'),
            'country': this.get('billingInformation.country')
          };
          this.get('stripeHttp').chargeCard(this.get('userInfo.userCard.customerId'), this.product.highestBid, this.product.id, data).then(() => {
            this.set('showRating', true);
          });
        } else {
          this.set('errors', true);
        }
      });
    },
    payWithToken(stripeElement) {
      this.triggerAction({
        action:'setAddress',
        target: this
      });
      this.get('productThree').validate()
      .then(({
        validations
      }) => {
        if (validations.get('isValid')) {
          let stripe = get(this, 'stripev3');
          let data = {
            name: this.get('cardName'),
            address_line1: this.get('billingInformation.street'),
            address_city: this.get('billingInformation.city'),
            address_zip: this.get('billingInformation.zip'),
            address_country: this.get('billingInformation.country')
          };
          stripe.createToken(stripeElement, data).then((result) => {
            this.get('stripeHttp').chargeByToken(result.token.id, this.product.highestBid, this.product.id).then(() => {
              this.set('showRating', true);
            });
          });
        } else {
          this.set('errors', true);
        }
      });
    },
    setRating(rate) {
      this.set('rating', rate);
    },
    skipRating() {
      this.set('showRating', false);
    },
    doneRating() {
      if (this.get('rating')) {
        this.get('userHttp').rateSeller(this.get('product.user.email'), this.get('rating'));
        this.set('showRating', false);
        this.get('router').transitionTo('product.show', this.product.id);
      } else {
        this.set('ratingError', true);
      }
    }
  }
});
