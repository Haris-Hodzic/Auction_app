import Route from '@ember/routing/route';
import DS from 'ember-data';

export default Route.extend({
  model() {
    return this.store.createRecord('user');
  }
});