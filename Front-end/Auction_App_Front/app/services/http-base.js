import Service from '@ember/service';
import { set } from '@ember/object';

export default Service.extend({
  ajaxReq(url, data, method) {
    set(this, 'error', null);
    return jQuery.ajax({
      method: method,
      url: url,
      cache: false,
      data: data,
      contentType: 'application/json'
    })
  }
});