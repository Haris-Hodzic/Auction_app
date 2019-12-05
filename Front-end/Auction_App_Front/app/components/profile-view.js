import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { set } from '@ember/object';

export default Component.extend({
  userHttp: service(),
  session: service('session'),
  store: service(),
  firstName: '',
  lastName: '',
  gender: 'Male',
  isGenderButtonActive: false,
  isMonthButtonActive: false,
  isDateButtonActive: false,
  selectedMonth: null,
  displayedMonth: '',
  selectedDate: '01',
  year: '',
  monthOptions: null,
  dateOptions: null,
  phoneNumber: '',
  email: '',
  street: '',
  city: '',
  zipCode: '',
  state: '',
  country: '',
  errors: false,
  userInfo: null,
  image: null,
  userProfile: null,
  isValidEmail: false,
  isValidPassword: false,
  isValid: true,
  init() {
    this._super(...arguments);
    this.set('userProfile', this.get('store').createRecord('user'));
    this.set('dateOptions', ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']);
    this.set('monthOptions', ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    this.get('userHttp').getUserInfo(this.get('session.data.email')).then((result) => {
      this.set('userInfo', result);
      this.set('selectedDate', result.dateOfBirth.slice(8, 10));
      if (result.dateOfBirth.slice(5, 6) === '0') {
        this.set('displayedMonth', this.get('monthOptions')[result.dateOfBirth.slice(6, 7)-1]);
        this.set('selectedMonth', result.dateOfBirth.slice(6, 7));
      } else {
        this.set('displayedMonth', this.get('monthOptions')[result.dateOfBirth.slice(5, 7)-1]);
        this.set('selectedMonth', result.dateOfBirth.slice(5, 7));
      }
      this.set('year', result.dateOfBirth.slice(0, 4));
    });
  },
  actions: {
    setProfileGender() {

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
      this.set('selectedMonth', monthSelected + 1);
      this.set('displayedMonth', monthDisplayed);
      this.set('isMonthButtonActive', false);
    },
    setDate(date){
      this.set('selectedDate', date);
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

    saveInfo(userInfo) {
      if (this.get('selectedMonth') > 9) {
        this.set('userInfo.dateOfBirth', this.get('year') + '-' + this.get('selectedMonth') + '-' + this.get('selectedDate'));
      } else if(this.get('selectedMonth') === null){
        this.set('userInfo.dateOfBirth', '');
      } else {
        this.set('userInfo.dateOfBirth', this.get('year') + '-0' + this.get('selectedMonth') + '-' + this.get('selectedDate'));
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
          for (var i = 0; i < validations.errors.length; i++) {
            if (validations.errors[i].type === 'username-available') {
              console.log(account.email)
              console.log(this.get('session.data.email'))
              if (account.email === this.get('session.data.email')) {
                this.set('isValidEmail', true);
                this.set('errors', false);
              } else {
                this.set('isValidEmail', false);
                console.log('nisu' + this.get('isValid'))
              }
            } else if (validations.errors[i].attribute === 'password') {
              this.set('isValidPassword', true);
            }
          }
          if (validations.errors.length > 2) {
            this.set('isValid', false);
          }
          console.log(this.get('isValid'))
          console.log(this.get('isValidEmail'))
          console.log(this.get('isValidPassword'))
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