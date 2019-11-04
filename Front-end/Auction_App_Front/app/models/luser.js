import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const { attr } = DS;
const Validations = buildValidations({
  email: [
  validator('presence', true),
  validator('format', { type: 'email' }),
  ],
  password: [
  validator('presence', true)
  ]
});

export default DS.Model.extend(Validations, {
  email: attr('string'),
  password: attr('string')
});