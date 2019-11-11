import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  httpBase: service(),
  arrivals: null,
  pageSize: '8',
  init() {
    this._super(...arguments);
    this.get('httpBase').ajaxReq('http://localhost:8080/api/arrivals', this.get('pageSize'), 'POST').then((result) => {
      this.set('arrivals', result);
    });
  },
  actions:{
    loadMore(){
      var temp = +this.get('pageSize')+8;
      this.set('pageSize', temp.toString());
      this.get('httpBase').ajaxReq('http://localhost:8080/api/arrivals', this.get('pageSize'), 'POST').then((result) => {
        this.set('arrivals', result);
      });
    }
  }
});