import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  productHttp: service(),
  pageSize: 5,
  actions: {
    exploreMore(){
      let today = new Date().toJSON().slice(0, 10);
      this.set('pageSize', this.get('pageSize') +5);
      this.get('productHttp').getActiveProductsByUserId(this.get('userInfo.id'), this.get('pageSize')).then((result) => {
        this.set('activeProductList', result);
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('activeProductList')[i], 'timeLeft', differenceDays);
          } else {
            set(this.get('activeProductList')[i], 'timeLeft', 0);
          }
        }
      });
    }
  }
});