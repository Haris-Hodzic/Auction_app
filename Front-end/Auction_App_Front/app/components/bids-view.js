import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  bidHttp: service(),
  pageSize: 5,
  actions: {
    exploreMore() {
      let today = new Date().toJSON().slice(0, 10);
      this.get('bidHttp').getBidsByUserId(this.get('userInfo.id'), 5).then((result) => {
        this.set('userBids', result);
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].product.endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('userBids')[i], 'timeLeft', differenceDays);
          } else {
            set(this.get('userBids')[i], 'timeLeft', 0);
          }
        }
      });
    }
  }
});