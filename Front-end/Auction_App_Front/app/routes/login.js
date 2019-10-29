import Route from '@ember/routing/route';
import User from '../models/user';

export default Route.extend({
<<<<<<< HEAD
  model() {
    return this.store.createRecord('luser');
  }
});
