import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  httpBase: service(),
  products: null,
  model() {
    return this.get('httpBase').ajaxReq('http://localhost:8080/api', '', 'GET');
  }
});
