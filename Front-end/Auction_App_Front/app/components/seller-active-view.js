import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  productHttp: service(),
  pageNumber: 0,
  nextButton: true,
  previousButton: false,
  actions: {
    nextPage() {
      const today = new Date().toJSON().slice(0, 10);
      this.set('previousButton', true);
      this.set('pageNumber', this.get('pageNumber') + 1);
      this.get('productHttp').getActiveProductsByUserId(this.get('userInfo.id'), this.get('pageNumber')).then((result) => {
        this.set('activeProducts', result);
        if (this.get('activeProducts').length < 5) {
          this.set('nextButton', false)
        }
        result.forEach(function(entry, index) {
          const endDate = entry.endDate.slice(0, 10);
          const date1 = new Date(today);
          const date2 = new Date(endDate);
          const differenceTime = date2 - date1;
          const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('activeProducts')[index], 'timeLeft', differenceDays);
          } else {
            set(this.get('activeProducts')[index], 'timeLeft', 0);
          }
        });
      });
    },
    previousPage() {
      const today = new Date().toJSON().slice(0, 10);
      this.set('pageNumber', this.get('pageNumber') - 1);
      if (this.get('pageNumber') === 0) {
        this.set('previousButton', false);
      }
      this.get('productHttp').getActiveProductsByUserId(this.get('userInfo.id'), this.get('pageNumber')).then((result) => {
        this.set('activeProducts', result);
        result.forEach(function(entry, index) {
          const endDate = entry.endDate.slice(0, 10);
          const date1 = new Date(today);
          const date2 = new Date(endDate);
          const differenceTime = date2 - date1;
          const differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('activeProducts')[index], 'timeLeft', differenceDays);
          } else {
            set(this.get('activeProducts')[index], 'timeLeft', 0);
          }
        });
      });
    }
  }
});
