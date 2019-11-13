import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
  httpBase: service(),
  getAllProducts() {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api', '', 'GET');
  },
  getProduct(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/' + data.product_id, data.product_id, 'GET');
  },
  getChances(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/lastchance/' + data, data, 'GET');
  },
  getArrivals(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/api/arrivals/' + data, data, 'GET');
  },
  emailAvailable(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/authentication/emailAvailable', data, 'POST');
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
  }
});
