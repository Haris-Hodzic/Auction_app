import Controller from '@ember/controller';

export default Controller.extend({
  arrivalsActive: true,
  ratingActive: false,
  chanceActive: false,
  arrivalsClass: 'active',
  ratingClass: '',
  chanceClass: '',
  actions: {
    onArrivals() {
      this.set('arrivalsActive', true);
      this.set('ratingActive', false);
      this.set('chanceActive', false);
      this.set('arrivalsClass', 'active');
      this.set('ratingClass', '');
      this.set('chanceClass', '');
    },
    onRating() {
      this.set('arrivalsActive', false);
      this.set('ratingActive', true);
      this.set('chanceActive', false);
      this.set('arrivalsClass', '');
      this.set('ratingClass', 'active');
      this.set('chanceClass', '');
    },
    onChance() {
      this.set('arrivalsActive', false);
      this.set('ratingActive', false);
      this.set('chanceActive', true);
      this.set('arrivalsClass', '');
      this.set('ratingClass', '');
      this.set('chanceClass', 'active');
    },
  }
});
