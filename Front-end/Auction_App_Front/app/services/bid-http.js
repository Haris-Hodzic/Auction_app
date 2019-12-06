import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
  httpBase: service(),
  getSingleBid(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/bid/product/' + data, data, 'GET');
  },
  createBid(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/bid/', data, 'POST');
  },
});