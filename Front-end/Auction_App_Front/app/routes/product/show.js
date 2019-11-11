import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  httpBase: service(),
  model(params) {
    return this.get('httpBase').ajaxReq('http://localhost:8080/api/'+ params.product_id , params.product_id, 'GET');
  }
});