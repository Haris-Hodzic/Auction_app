import Component from '@ember/component';

export default Component.extend({
  actions: {
    bidNow() {
      this.get('router').transitionTo("product.show", this.product.id);
    }
  }
});
