import Service from '@ember/service';
import { set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Service.extend({
  session: service('session'),
  ajaxReq(url, data, method) {
    const token = this.get('session.data.authenticated.token');
    set(this, 'error', null);
    return jQuery.ajax({
      method: method,
      url: url,
      cache: false,
      data: data,
      contentType: 'application/json',
      beforeSend:  function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      }
    })
  }
});
