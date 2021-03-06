import Service from '@ember/service';
import {inject as service} from '@ember/service';
import Config from '../config/environment';

export default Service.extend({
  stompClient: null,
  connected: false,
  notifications: service('notification-messages'),
  session: service('session'),
  messages: null,
  username: "anonymous user",
  feedback: "",
  init() {
    this._super(...arguments);
    this.set('messages', []);
  },
  add(user, productId) {
    this.get('messages').pushObject({'user': user, 'productId': productId});
  },
  empty() {
    this.get('messages').clear();
  },
  connect(){
    this.clearFeedback();
    var comp = this;
    var socket = new SockJS(Config.APP.SERVER_URL + '/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function () {
     comp.set('connected', true);
     comp.stompClient.subscribe('/topic/notifications', function (greeting) {
      comp.empty();
      var productId = JSON.parse(greeting.body).productId;
      var user = JSON.parse(greeting.body).user;
      if (comp.get('session.data.email') === user) {
        comp.get('notifications').clearAll().success('You are the highest bidder', {
          autoClear: true,
          clearDuration: 4400
        });
      } else {
        comp.get('notifications').clearAll().warning(user + ' is now the highest bidder for this product', {
          autoClear: true,
          clearDuration: 4400
        });
      }
      comp.showMessage(user, productId);
    });
   });
  },
  disconnect(){
    this.clearFeedback();
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.set('connected', false);
  },
  showMessage(user, productId) {
    this.add(user, productId);
  },
  sendMessage(user, productId) {
    if (this.stompClient != null && this.get('connected')) {
      this.stompClient.send("/app/notification", {}, JSON.stringify({'user': user, 'productId': productId}));
    } else {
      this.set('feedback', 'You are not connected!');
    }
  },
  clearFeedback() {
    this.set('feedback','');
  }
});
