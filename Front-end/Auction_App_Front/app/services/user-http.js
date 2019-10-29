import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  httpBase: service(),
  register(data) {
    this.get('httpBase').ajaxReq('http://localhost:8080/authentication', data, 'POST');
  }
});
