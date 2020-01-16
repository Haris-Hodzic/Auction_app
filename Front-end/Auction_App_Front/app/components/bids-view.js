import Component from '@ember/component';

export default Component.extend({
  actions: {
    closeNotification() {
      this.set('notification', false);
    }
  }
});
