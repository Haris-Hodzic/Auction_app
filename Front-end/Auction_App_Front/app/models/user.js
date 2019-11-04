import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';
const { attr } = DS;
const Validations = buildValidations({
  firstName: [
  validator('presence', {
    presence: true
  }), 
  ],
  lastName: [
  validator('presence', true),
  ],
  email: [
  validator('presence', true),
  validator('username-available'),
  validator('format', { 
    type: 'email',
    message: 'Enter the valid email format!'
  }),
  ],
  password: [
  validator('presence', true),
  validator('length', {
    min: 4
  }),
  validator('format', {  
    regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,10}$/,
    message:
    '{description} must include at least one upper case letter, one lower case letter, and a number'
  }),
  validator('length', {
    isWarning: true,
    min: 6,
    message: 'What kind of weak password is that?'
  })
  ]
});

export default DS.Model.extend(Validations, {
  firstName: attr('string'),
  lastName: attr('string'),
  email: attr('string'),
  password: attr('string')
});