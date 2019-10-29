import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { getOwner } from '@ember/application';
import { set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { inject } from '@ember/controller';

export default Controller.extend({
  session: service('session'),
  productHttp: service(),
  search: '',
  shopController: inject('shop'),
  shopModel: alias('shopController.model'),
  shopFilters: alias('shopController.filters'),
  actions: {
    logout() {
      this.get('session').set('data.email', '');
      this.get('session').invalidate();
      getOwner(this).lookup('router:main').transitionTo('login');
    },
    searchProducts() {
      this.transitionToRoute('shop');
      set(this.get('shopFilters'), 'searchString', this.get('search'));
      this.get('productHttp').filterProductsBySubcategory(this.get('shopFilters')).then((result) => {
        this.set('shopModel', result);
      });
    }
  }
});
