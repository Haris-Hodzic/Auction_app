import Service from '@ember/service';
import { inject as service } from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
  httpBase: service(),
  register(data) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/authentication', data, 'POST');
  },
  getUserInfo(email) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/authentication/user?email=' + email, '', 'GET');
  },
  updateUser(user) {
    return this.get('httpBase').ajaxReq(Config.APP.SERVER_URL + '/authentication/' + user.id, JSON.stringify(user), 'PUT');
  }
});