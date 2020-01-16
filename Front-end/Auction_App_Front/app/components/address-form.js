import Component from '@ember/component';
import emberCountries from 'ember-countries';

export default Component.extend({
  isCountryButtonActive: false,
  listOfCountries: emberCountries.COUNTRIES_LIST,
  actions: {
    setDropdownButtonsActive() {
      if (this.get('isCountryButtonActive') === false) {
        this.set('isCountryButtonActive', true);
      } else {
        this.set('isCountryButtonActive', false);
      }
    },
    setCountry(selectedCountry) {
      this.set('billingInformation.country', selectedCountry);
      this.set('isCountryButtonActive', false);
    }
  }
});
