import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  bidHttp: service(),
  buttonsList: null,
  init() {
    this._super(...arguments);
    this.set('buttonsList',[]);
    for (var i = 0; i < this.get('totalNumberOfBids')/5; i++) {
      this.get('buttonsList').pushObject({page: i+1});
    }
  },
  actions: {
    exploreMore(page) {
      const today = new Date().toJSON().slice(0, 10);
      this.get('bidHttp').getBidsByUserId(this.get('userInfo.id'), page).then((result) => {
        this.set('bids', result.content);
        const self = this;
        result.content.forEach(function(entry, index) {
          const endDate = entry.product.endDate.slice(0, 10);
          const date1 = new Date(today);
          const date2 = new Date(endDate);
          const differenceTime = date2 - date1;
          const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(self.get('bids')[index], 'timeLeft', differenceDays);
          } else {
            set(self.get('bids')[index], 'timeLeft', 0);
          }
        });
      });
    }
  }
});
