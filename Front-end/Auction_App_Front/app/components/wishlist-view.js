import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  wishlistHttp: service(),
  buttonsList: null,
  init() {
    this._super(...arguments);
    this.set('buttonsList',[]);
    for (var i = 0; i < this.get('totalNumberOfWishlist')/5; i++) {
      this.get('buttonsList').pushObject({page: i+1});
    }
  },
  actions: {
    exploreMore(page) {
      const today = new Date().toJSON().slice(0, 10);
      this.get('wishlistHttp').getWishlistByUserId(this.get('userInfo.id'), page).then((result) => {
        this.set('userWishlist', result.content);
        result.content.forEach(function(entry, index) {
          const endDate = entry.product.endDate.slice(0, 10);
          const date1 = new Date(today);
          const date2 = new Date(endDate);
          const differenceTime = date2 - date1;
          const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('userWishlist')[index], 'timeLeft', differenceDays);
            set(this.get('userWishlist')[index], 'status', 'OPEN');
            set(this.get('userWishlist')[index], 'statusClass', 'open')
          } else {
            set(this.get('userWishlist')[index], 'timeLeft', 0);
            set(this.get('userWishlist')[index], 'status', 'CLOSED');
            set(this.get('userWishlist')[index], 'statusClass', 'closed')
          }
        });
      });
    }
  }
});
