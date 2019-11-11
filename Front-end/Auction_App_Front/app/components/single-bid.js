import Component from '@ember/component';

export default Component.extend({
  date: null,
  init() {
    this._super(...arguments);
    this.set('date', this.get('bid.date').slice(0, 10));
  }
});
