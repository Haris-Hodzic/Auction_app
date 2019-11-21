import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
    this.set('products', this.get('products').slice(8, 16));
  }
});