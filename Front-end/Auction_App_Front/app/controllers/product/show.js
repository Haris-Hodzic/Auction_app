import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import { get } from '@ember/object';
import { set } from '@ember/object';

export default Controller.extend({
  productHttp: service(),
  stripeHttp: service(),
  stripev3: service(),
  products: null,
  haris: '',
  options: {
    hidePostalCode: true,
  },

  token: null,
  init() {
    this._super(...arguments);
    this.get('productHttp').getAllProducts().then((result) => {
      this.set('products', result.slice(0, 3));
    });
  },
  actions: {
    submit(cardNumber, cardExpiry, cardCvc) {
      let stripe = get(this, 'stripev3');
      stripe.createToken(cardNumber, cardExpiry, cardCvc).then(({token}) => {
      	const data = JSON.stringify({
        'stripeToken': token.id,
        'amount': '50'
      });
      	console.log(data)
      	this.get('stripeHttp').charge(token.id, '50').then((result) => {
      		console.log(result);
      	});
        set(this, 'token', token);
      }).catch((result) => {
      	console.log(result)
      });
    }
  }
});
