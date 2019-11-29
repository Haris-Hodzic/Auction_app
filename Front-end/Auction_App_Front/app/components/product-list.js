import Component from '@ember/component';

export default Component.extend({
  watchListClass: '',
  isWatchList: false,
  actions: {
    setWatchList() {
      if (this.get('isWatchList') != false) {
        this.set('watchListClass', '');
        this.set('isWatchList', false);
      } else {
        this.set('watchListClass', 'active');
        this.set('isWatchList', true);
      }
    },
  }
});