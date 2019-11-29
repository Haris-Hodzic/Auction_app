import Component from '@ember/component';

export default Component.extend({
  watchListClass: '',
  isWatchListActive: false,
  actions: {
    setWatchList() {
      if (this.get('isWatchListActive') != false) {
        this.set('watchListClass', '');
        this.set('isWatchListActive', false);
      } else {
        this.set('watchListClass', 'active');
        this.set('isWatchListActive', true);
      }
    },
  }
});
