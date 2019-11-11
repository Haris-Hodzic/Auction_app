import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  httpBase: service(),
  session: service('session'),
  endDate: null,
  endDateDay: null,
  endDateMonth: null,
  today: null,
  todayDay: null,
  todayMonth: null,
  timeLeft: null,
  watchList: 'wl',
  currentPhoto: '0',
  user: null,
  owner: false,
  init() {

    this._super(...arguments);
    let today = new Date().toJSON().slice(0,10);
    let endDate = this.product.endDate.slice(0, 10);
    let todayDay = today.slice(8, 10);
    let endDateDay = endDate.slice(8, 10);
    let endDateMonth = endDate.slice(5,7);
    let todayMonth = today.slice(5,7);
    let user = this.product.user.email;

    if ((endDateMonth-todayMonth) > 0) {
      this.set('timeLeft', (endDateMonth-todayMonth)+ ' months and '+ (endDateDay-todayDay)+ ' days');
    } else if ((endDateMonth-todayMonth) == 0){
      this.set('timeLeft', (endDateDay-todayDay)+ ' days');
    } else{
      this.set('timeLeft', 'finished');
    }
    if (this.get('session.data.email') === user) {
      this.set('owner', true);
    }else{
      this.set('owner', false);
    }
  },
  actions: {
    setWatchList(){
      if (this.get('watchList') != 'wl'){
        this.set('watchList', 'wl');
      }else{
        this.set('watchList', 'wlActive');
      }
    },
    setPhoto(num){
      this.set('currentPhoto', num);
    }
  }
});