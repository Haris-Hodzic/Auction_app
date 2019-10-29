import Route from '@ember/routing/route';
import User from '../models/user';

export default Route.extend({
  model() {
    return this.store.createRecord('luser');
  }
});