import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
  httpBase: service(),
  createProduct(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api', data, 'POST');
  },
  getAllProducts() {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api', '', 'GET');
  },
  getProduct(productId) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/' + productId, productId, 'GET');
  },
  getChances(pageNumber) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/lastchance/' + pageNumber, pageNumber, 'GET');
  },
  getArrivals(pageNumber) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/arrivals/' + pageNumber, pageNumber, 'GET');
  },
  getPrices() {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/price', '', 'GET');
  },
  getProductSubcategories(category) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/subcategories?category=' + category, '', 'GET');
  },
  filterProductsBySubcategory(filters) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/filter', filters, 'GET');
  },
  getCountedProductColor() {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/filter/color', '', 'GET');
  },
  getCountedProductSize() {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/filter/size', '', 'GET');
  },
  getSoldProductsByUserId(userId, pageNumber) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/sold?userId=' + userId +'&pageNumber=' + pageNumber, '', 'GET');
  },
  getActiveProductsByUserId(userId, pageNumber) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/active?userId=' + userId + '&pageNumber=' + pageNumber, '', 'GET');
  },
  getActiveProducts() {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/product/active', '', 'GET');
  }
});
