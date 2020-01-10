import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  productId: attr('string'),
  numberOfViews: attr('number')
});
