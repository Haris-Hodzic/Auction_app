import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  productHttp: service(),
  pageSize: 5,
  pageNumber: 0,
  nextButton: true,
  previousButton: false,
  actions: {
    nextPage() {
      let today = new Date().toJSON().slice(0, 10);
      this.set('previousButton', true);
      this.set('pageNumber', this.get('pageNumber') + 1);
      this.get('productHttp').getSoldProductsByUserId(this.get('userInfo.id'), this.get('pageNumber')).then((result) => {
        this.set('soldProducts', result);
        if (this.get('soldProducts').length < 5) {
          this.set('nextButton', false)
        }
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('soldProducts')[i], 'timeLeft', differenceDays);
          } else {
            set(this.get('soldProducts')[i], 'timeLeft', 0);
          }
        }
      });
    },
    previousPage() {
      let today = new Date().toJSON().slice(0, 10);
      this.set('pageNumber', this.get('pageNumber') - 1);
      if (this.get('pageNumber') === 0) {
        this.set('previousButton', false);
      }
      this.get('productHttp').getSoldProductsByUserId(this.get('userInfo.id'), this.get('pageNumber')).then((result) => {
        this.set('soldProducts', result);
        for (var i = 0; i < result.length; i++) {
          let endDate = result[i].endDate.slice(0, 10);
          let date1 = new Date(today);
          let date2 = new Date(endDate);
          let differenceTime = date2 - date1;
          let differenceDays = Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
          if (differenceDays >= 0) {
            set(this.get('soldProducts')[i], 'timeLeft', differenceDays);
          } else {
            set(this.get('soldProducts')[i], 'timeLeft', 0);
          }
        }
      });
    }
  }
});
