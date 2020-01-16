import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
  userHttp: service(),
  session: service(),
  userInfo: null,
  init() {
    this._super(...arguments);
    this.get('userHttp').getUserInfo(this.get('session.data.email')).then((result) => {
      this.set('userInfo', result);
    });
  }
});
