import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
	httpBase: service(),
	chargeCard(customerId, amount, productId, data) {
		return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/stripe/charge/card?customerId=' + customerId + '&amount=' + amount + '&productId=' + productId, JSON.stringify(data), 'POST');
	},
	chargeByToken(stripeToken, amount, productId) {
		return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/stripe/charge/token?stripeToken=' + stripeToken + '&amount=' + amount + '&productId=' + productId, '', 'POST');
	},
	createCard(stripeToken, email, name) {
		return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/stripe/card?stripeToken=' + stripeToken + '&email=' + email + '&name=' + name, '', 'POST');
	}
});
