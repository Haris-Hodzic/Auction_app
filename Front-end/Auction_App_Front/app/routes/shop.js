import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  productHttp: service(),
  filters: null,
  model() {
    this.set('filters', { category: '', subcategory: '', searchString: '', startPrice: null, endPrice: null, color: '', size: '', pageSize: 9, sortingType: 'id', order: 'descending'});
    return this.get('productHttp').filterProductsBySubcategory(this.get('filters'));
  }
});
