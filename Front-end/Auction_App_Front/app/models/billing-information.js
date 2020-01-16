import DS from 'ember-data';
import { validator, buildValidations} from 'ember-cp-validations';

const { attr } = DS;
const Validations = buildValidations({
  address: [
  validator('presence', {
    presence: true
  })
  ],
  country: [
  validator('presence', {
    presence: true
  })
  ],
  city: [
  validator('presence', {
    presence: true
  })
  ],
  zip: [
  validator('presence', {
    presence: true
  })
  ],
  phone: [
  validator('presence', {
    presence: true
  })
  ]
});

export default DS.Model.extend(Validations, {
  address: attr('string'),
  country: attr('string'),
  city: attr('string'),
  zip: attr('string'),
  phone: attr('string')
});
