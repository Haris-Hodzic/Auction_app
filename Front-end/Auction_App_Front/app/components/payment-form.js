import Component from '@ember/component';
import emberCountries from 'ember-countries';
import { later } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Component.extend({
  listOfCountries: emberCountries.COUNTRIES_LIST,
  stripeHttp: service(),
  userHttp: service(),
  isCityButtonActive: false,
  isCountryButtonActive: false,
  city: '',
  country: 'Select Country',
  street: '',
  zip: '',
  phone: '',
  cardName: '',
  isProfileCard: true,
  showRating: false,
  rating: null,
  ratingError: false,
  init() {
    this._super(...arguments);
  },
  actions: {
    setDropdownButtonsActive(button) {
      if (button === 'country') {
        if (this.get('isCountryButtonActive') === false) {
          this.set('isCountryButtonActive', true);
        } else {
          this.set('isCountryButtonActive', false);
        }
      }
    },
    setCountry(selectedCountry) {
      this.set('country', selectedCountry);
      this.set('isCountryButtonActive', false);
    },
    setCard() {
      if (this.get('isProfileCard')) {
        this.set('isProfileCard', false);
        const self = this;
        later(function() {
          var stripe = Stripe('pk_test_ZKJ462EIJXGrwgTSCfy2dzZF00A3kiYrAn');
          var elements = stripe.elements();
          var style = {
            base: {
              fontFamily: 'Lato-Regular',
              fontSize: '16px',
              color: '#252525',
              letterSpacing: '0.56px',

              '::placeholder': {
                fontFamily: 'Lato-Regular',
                fontSize: '18px',
                color: '#9B9B9B',
                letterSpacing: '0.63px',
              },
            },
          };
          var cardNumberElement = elements.create('cardNumber', {
            style: style
          });
          cardNumberElement.mount('#card-number-element');

          var cardExpiryElement = elements.create('cardExpiry', {
            style: style
          });
          cardExpiryElement.mount('#card-expiry-element');

          var cardCvcElement = elements.create('cardCvc', {
            style: style
          });
          cardCvcElement.mount('#card-cvc-element');
          cardNumberElement.on('change', function(event) {
            var errorElement = document.querySelector('.error');
            errorElement.classList.remove('visible');
            if (event.error) {
              errorElement.textContent = event.error.message;
              errorElement.classList.add('visible');
            }
          });
          cardExpiryElement.on('change', function(event) {
            var errorElement = document.querySelector('.error');
            errorElement.classList.remove('visible');
            if (event.error) {
              errorElement.textContent = event.error.message;
              errorElement.classList.add('visible');
            }
          });
          cardCvcElement.on('change', function(event) {
            var errorElement = document.querySelector('.error');
            errorElement.classList.remove('visible');
            if (event.error) {
              errorElement.textContent = event.error.message;
              errorElement.classList.add('visible');
            }
          });
          document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            let data = {
              name: self.get('cardName'),
              address_line1: self.get('street'),
              address_city: self.get('city'),
              address_zip: self.get('zip'),
              address_country: self.get('country')
            };
            stripe.createToken(cardNumberElement, data).then((result) => {
              if (result.error){
                errorElement.textContent = result.error.message;
                errorElement.classList.add('visible');
              } else {
                self.get('stripeHttp').chargeByToken(result.token.id, self.product.highestBid, self.product.id).then((result) => {
                  console.log(result)
                  self.set('showRating', true);
                });
              }
            })
          });
        }, 10);
      } else {
        this.set('isProfileCard', true);
      }
    },
    pay() {
      let data = {
        'street': this.get('street'),
        'city': this.get('city'),
        'zipCode': this.get('zip'),
        'country': this.get('country')
      };
      this.get('stripeHttp').chargeCard(this.get('userInfo.userCard.customerId'), this.product.highestBid, this.product.id, data).then((result) => {
        this.set('showRating', true);
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
        this.get('userHttp').rateSeller(this.get('product.user.email'), this.get('rating')).then((result) => {
        console.log(result)
      });
      this.set('showRating', false);
      this.get('router').transitionTo('product.show', this.product.id);
    } else {
      this.set('ratingError', true);
    }
    }
  }
});
