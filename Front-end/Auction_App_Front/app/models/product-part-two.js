import DS from 'ember-data';
import { validator, buildValidations} from 'ember-cp-validations';

const { attr } = DS;
const now = new Date;
const Validations = buildValidations({
  startPrice: [
  validator('presence', {
    presence: true
  }),
  validator('number', {
    allowString: true,
    integer: true,
    gt: 0
  })
  ],
  startDate: [
  validator('presence', {
    presence: true
  }),
  validator('date', {
    after: now.setDate(now.getDate() - 1)
  }),
  ],
  endDate: [
  validator('presence', {
    presence: true
  }),
  validator('date', {
    after: now
  }),
  ]
});
export default DS.Model.extend(Validations, {
  startPrice: attr('number'),
  startDate: attr('date'),
  endDate: attr('date'),
});
