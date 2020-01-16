import DS from 'ember-data';
import { validator, buildValidations} from 'ember-cp-validations';

const { attr } = DS;
const Validations = buildValidations({
  name: [
  validator('presence', {
    presence: true
  }),
  validator('length', {
    max: 60
  }),
  validator('format', {
    regex: /^\w+(?:\s+\w+){1,4}$/,
    message: 'Enter two to five words'
  }),
  ],
  category: [
  validator('presence', true),
  ],
  subcategory: [
  validator('presence', true)
  ],
  description: [
  validator('presence', true),
  validator('length', {
    max: 700
  }),
  validator('format', {
    regex: /^\w+(?:\s+\w+){0,99}$/,
    message: 'You can enter max 100 words!'
  }),
  ]
});

export default DS.Model.extend(Validations, {
  name: attr('string'),
  category: attr('string'),
  subcategory: attr('string'),
  description: attr('string')
});
