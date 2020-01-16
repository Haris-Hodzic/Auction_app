import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';

export default Component.extend({
  userHttp: service(),
  session: service('session'),
  store: service(),
  gender: 'Male',
  stripev3: service(),
  stripeHttp: service(),
  notifications: service('notification-messages'),
  isGenderButtonActive: false,
  isMonthButtonActive: false,
  isDateButtonActive: false,
  selectedMonth: null,
  dateOfBirth: null,
  monthOptions: null,
  dateOptions: null,
  errors: false,
  userInfo: null,
  cardName: '',
  image: null,
  userProfile: null,
  isValidEmail: false,
  isValidPassword: false,
  isValid: true,
  cardNumberPlaceholder: '',
  isCardEntered: false,
  userEmail: null,
  init() {
    this._super(...arguments);
    this.set('dateOfBirth', {
      date: '01',
      month: '',
      year: ''
    });
    this.set('userEmail', this.get('session.data.email'));
    this.set('userProfile', this.get('store').createRecord('user'));
    this.set('dateOptions', ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']);
    this.set('monthOptions', ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    this.get('userHttp').getUserInfo(this.get('session.data.email')).then((result) => {
      this.set('userInfo', result);
      if (result.userCard) {
        this.set('isCardEntered', true);
      } else {
        this.set('isCardEntered', false);
      }
      this.set('selectedDate', result.dateOfBirth.slice(8, 10));
      this.set('dateOfBirth.date', result.dateOfBirth.slice(8, 10));
      if (result.dateOfBirth.slice(5, 6) === '0') {
        this.set('displayedMonth', this.get('monthOptions')[result.dateOfBirth.slice(6, 7) - 1]);
        this.set('dateOfBirth.month', result.dateOfBirth.slice(6, 7));
      } else {
        this.set('displayedMonth', this.get('monthOptions')[result.dateOfBirth.slice(5, 7) - 1]);
        this.set('dateOfBirth.month', result.dateOfBirth.slice(5, 7));
      }
      this.set('dateOfBirth.year', result.dateOfBirth.slice(0, 4));
    });
  },
  actions: {
    changeCard() {
      this.set('isCardEntered', false);
    },
    setGender(gender) {
      this.set('userInfo.gender', gender);
      this.set('gender', gender);
    },
    setDropdownButtonsActive(button) {
      if (button === 'gender') {
        if (this.get('isGenderButtonActive') === false) {
          this.set('isGenderButtonActive', true);
        } else {
          this.set('isGenderButtonActive', false);
        }
      } else if (button === 'month') {
        if (this.get('isMonthButtonActive') === false) {
          this.set('isMonthButtonActive', true);
        } else {
          this.set('isMonthButtonActive', false);
        }
      } else if (button === 'date') {
        if (this.get('isDateButtonActive') === false) {
          this.set('isDateButtonActive', true);
        } else {
          this.set('isDateButtonActive', false);
        }
      }
    },
    setMonth(monthSelected, monthDisplayed) {
      this.set('dateOfBirth.month', monthSelected + 1);
      this.set('displayedMonth', monthDisplayed);
      this.set('isMonthButtonActive', false);
    },
    setDate(date) {
      this.set('dateOfBirth.date', date);
      this.set('isDateButtonActive', false);
    },
    upload(event) {
      const reader = new FileReader();
      const file = event.target.files[0];
      let imageData;
      reader.onload = () => {
        imageData = reader.result;
        this.set('userInfo.profilePhoto', imageData);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    },
    create(stripeElement) {
      let stripe = get(this, 'stripev3');
      stripe.createToken(stripeElement, {
        name: this.get('cardName')
      }).then((result) => {
        this.get('stripeHttp').createCard(result.token.id, this.get('userEmail'), this.get('cardName')).then((result) => {
          if (result) {
            if (this.get('userInfo.userCard')) {
              this.get('notifications').success('You successfully updated your card.', {
                autoClear: true,
                clearDuration: 4400
              });
            } else {
              this.get('notifications').success('You successfully saved your card.', {
                autoClear: true,
                clearDuration: 4400
              });
            }
          }
        }).catch(() => {
          this.get('notifications').warning('This card already exists!', {
            autoClear: true,
            clearDuration: 4400
          });
        });
      });
    },
    saveInfo(userInfo) {
      if (this.get('dateOfBirth.month') > 9) {
        this.set('userInfo.dateOfBirth', this.get('dateOfBirth.year') + '-' + this.get('dateOfBirth.month') + '-' + this.get('dateOfBirth.date'));
      } else if (this.get('dateOfBirth.month') === null) {
        this.set('userInfo.dateOfBirth', '');
      } else {
        this.set('userInfo.dateOfBirth', this.get('dateOfBirth.year') + '-0' + this.get('dateOfBirth.month') + '-' + this.get('dateOfBirth.date'));
      }
      let account = this.get('userProfile');

      set(account, 'firstName', userInfo.firstName);
      set(account, 'lastName', userInfo.lastName);
      set(account, 'email', userInfo.email);
      set(account, 'password', userInfo.password);
      account.validate()
        .then(({
          validations
        }) => {
          if (validations.get('isValid')) {
            this.set('errors', false);
            this.get('userHttp').updateUser(userInfo);
          } else {
            const self = this;
            validations.errors.forEach(function(entry) {
              if (entry.type === 'username-available') {
                if (account.email === self.get('userEmail')) {
                  self.set('isValidEmail', true);
                  self.set('errors', false);
                } else {
                  self.set('isValidEmail', false);
                }
              } else if (entry.attribute === 'password') {
                self.set('isValidPassword', true);
              }
            });
            if (validations.errors.length > 2) {
              this.set('isValid', false);
            }
            if (this.get('isValid') && this.get('isValidEmail') && this.get('isValidPassword')) {
              this.set('errors', false);
              this.get('userHttp').updateUser(userInfo);
            } else {
              this.set('errors', true);
            }
          }
        });
    }
  }
});
