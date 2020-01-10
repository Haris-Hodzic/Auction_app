import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RealtimeRouteMixin from 'emberfire/mixins/realtime-route';

export default Route.extend(RealtimeRouteMixin, {
  store: service(),
  session: service('session'),
  model(params) {
    return this.store.query('view', {
      filter: {
        productId: params.product_id
      }
    })
  },
  beforeModel() {
    this.set('session.previousRouteName', location.href.slice(location.href.indexOf(location.pathname)));
    this.store.createRecord('view');
  }
});
