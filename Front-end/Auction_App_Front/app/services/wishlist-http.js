import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
  httpBase: service(),
  getWishlistByUserId(user, pageSize) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist/user?user=' + user + '&pageSize=' + pageSize, '', 'GET');
  },
  addToWishlist(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist/', data, 'POST');
  },
  existInWishlist(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist/exist', JSON.stringify(data), 'POST');
  },
  deleteProductFromWishlist(product) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist', JSON.stringify(product), 'DELETE');
  }
});