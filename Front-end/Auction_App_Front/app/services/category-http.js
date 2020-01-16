import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
  httpBase: service(),
  getCategoryByName(name) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/category/get?categoryName=' + name, '', 'GET');
  }
});
