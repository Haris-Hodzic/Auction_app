
import Ember from 'ember';
import { set } from '@ember/object';
import $ from 'jquery';

export default Ember.Service.extend({
	  ajaxReq(url, data , method) {
	console.log(data);
   set(this, 'error', null);
     return jQuery.ajax({
      method: method,
      url: url,
      cache: false,
      data: data,
      contentType: 'application/json'
    }).then((result) => {
    	console.log(result)
    });
     
  }
});
