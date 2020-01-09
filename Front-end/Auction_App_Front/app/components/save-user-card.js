import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  session: service('session'),
  stripeHttp: service(),
  notifications: service('notification-messages'),
  userEmail: null,
  cardName: '',
  init() {
    this._super(...arguments);
    this.set('userEmail', this.get('session.data.email'));
  },
  didInsertElement() {
    var stripe = Stripe('pk_test_ZKJ462EIJXGrwgTSCfy2dzZF00A3kiYrAn');
    var elements = stripe.elements();
    const self = this;
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
      var options = {
        name: self.get('cardName'),
      };
      stripe.createToken(cardNumberElement, {name: self.get('cardName')}).then((result) => {
        var errorElement = document.querySelector('.error');
        /**/
        if (result.error){
          errorElement.textContent = result.error.message;
          errorElement.classList.add('visible');
        } else {
          self.get('stripeHttp').createCard(result.token.id, self.get('userEmail'), self.get('cardName')).then((result) => {
            self.get('notifications').success(result, {
              autoClear: true,
              clearDuration: 4400
            });
          });
        }
      });
    });
  }
});
