import Component from '@ember/component';
import emberCountries from 'ember-countries';
import EmberObject from '@ember/object';

export default Component.extend({
  isCountryButtonActive: false,
  listOfCountries: emberCountries.COUNTRIES_LIST,
  actions: {
    setDropdownButtonsActive() {
      this.toggleProperty('isCountryButtonActive');
    },
    setCountry(selectedCountry) {
      this.set('billingInformation.country', selectedCountry);
      this.set('isCountryButtonActive', false);
    }
  }
});
