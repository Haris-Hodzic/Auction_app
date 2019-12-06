import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  wishlistHttp: service(),
  pageSize: 5,
  actions: {
    exploreMore() {
      let today = new Date().toJSON().slice(0, 10);
      this.set('pageSize', this.get('pageSize') +5)
      this.get('wishlistHttp').getWishlistByUserId(this.get('userInfo.id'), this.get('pageSize')).then((result) => {
        this.set('userWishlist', result);
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].product.endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('userWishlist')[i], 'timeLeft', differenceDays);
            set(this.get('userWishlist')[i], 'status', 'OPEN');
            set(this.get('userWishlist')[i], 'statusClass', 'open')
          } else {
            set(this.get('userWishlist')[i], 'timeLeft', 0);
            set(this.get('userWishlist')[i], 'status', 'CLOSED');
            set(this.get('userWishlist')[i], 'statusClass', 'closed')
          }
        }
      });
    }
  }
});