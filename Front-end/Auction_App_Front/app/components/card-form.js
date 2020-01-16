import Component from '@ember/component';

export default Component.extend({
  actions: {
    payWithToken(stripeElement) {
      this.buttonAction(stripeElement);
    }
  }
});
