import Controller from '@ember/controller';
import { inject as service } from '@ember/service';


export default Controller.extend({
		userHttp: service(),
	  actions: {
    listAll() {
      this.get('userHttp').listAll("");
  },
}
});
