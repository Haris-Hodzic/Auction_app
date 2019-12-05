import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
  httpBase: service(),
  getWishlistByUserId(userId, pageNumber) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist/user?userId=' + userId + '&pageNumber=' + pageNumber, '', 'GET');
  },
  addToWishlist(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist/', data, 'POST');
  },
  existInWishlist(productId) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist/exist?productId=' + productId, productId, 'POST');
  },
  deleteProductFromWishlist(productId) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist?id=' + productId, productId, 'DELETE');
  },
  getAllWishlist(){
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/wishlist', '', 'GET');
  }
});
