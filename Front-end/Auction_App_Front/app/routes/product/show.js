import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { next } from '@ember/runloop';
import RSVP from 'rsvp';
import RealtimeRouteMixin from 'emberfire/mixins/realtime-route';
import PerformanceRouteMixin from 'emberfire/mixins/performance-route';

export default Route.extend(RealtimeRouteMixin, PerformanceRouteMixin, {
  productHttp: service(),
  store: service(),
  previousPath: null,
  currentPath: null,
  productModel: null,
  product: null,
  test:null,
  model(params) {
    this.set('previousPath', location.href.slice(location.href.indexOf(location.pathname)));
    var self = this;
      if ('/product/' + params.product_id !== this.get('previousPath')) {
      this.store.query('view', {
      filter: {
        productId: params.product_id
      }
    }).then(function(result) {
      if (result.length === 0) {
        console.log('priv')
        var view = self.store.createRecord('view',{
          productId: params.product_id,
          numberOfViews: 1
        });
        view.save();
        self.set('test', view.numberOfViews);
      }else {
        var productView = result.get("firstObject");
        productView.set('numberOfViews', productView.numberOfViews + 1);
        productView.save();
        self.set('test', productView.numberOfViews);
        console.log(self.get('test'))
      }
    });
    } else {
      this.store.query('view', {
      filter: {
        productId: params.product_id
      }
    }).then(function(result) {
      var productView = result.get("firstObject");
      self.set('test', productView.numberOfViews);
    });
    }
    console.log(this.get('test'))
    return RSVP.hash({
      product: this.get('productHttp').getProduct(params),
      numberOfViews: this.store.query('view', {
      filter: {
        productId: params.product_id
      }
    })
    });
  },
  afterModel(model) {
    this.store.createRecord('view');
    this.set('previousPath', location.href.slice(location.href.indexOf(location.pathname)));

  },
  beforeModel(){

  }
});
