import Component from '@ember/component';

export default Component.extend({
  photo: null,
  init() {
    this._super(...arguments);
    if (this.product.photo.length > 0) {
      this.set('photo', this.product.photo[0]);
    } else {
      this.set('photo', 'assets/images/noImage.png');
    }
  },
  actions: {
    bidNow() {
      this.get('router').transitionTo("product.show", this.product.id);
    }
  }
});
