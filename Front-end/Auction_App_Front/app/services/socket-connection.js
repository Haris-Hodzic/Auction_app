import Service from '@ember/service';
import { inject as service} from '@ember/service';
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
  add(user, productId, numberOfBids, highestBid) {
    this.get('messages').pushObject({
      'user': user,
      'productId': productId,
      'numberOfBids': numberOfBids,
      'highestBid': highestBid
    });
  },
  empty() {
    this.get('messages').clear();
  },
  connect() {
    this.clearFeedback();
    const comp = this;
    const socket = new SockJS(Config.APP.SERVER_URL + '/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function() {
      comp.set('connected', true);
      comp.stompClient.subscribe('/topic/bid/notification', function(message) {
        comp.empty();
        const productId = JSON.parse(message.body).productId;
        const user = JSON.parse(message.body).user;
        const numberOfBids = JSON.parse(message.body).numberOfBids;
        const highestBid = JSON.parse(message.body).highestBid;
        if (comp.get('session.data.email') === user) {
          comp.get('notifications').clearAll().success('You are the highest bidder', {
            autoClear: true,
            clearDuration: 4400
          });
        }
        if (comp.get('session.data.email') !== user) {
          comp.get('notifications').clearAll().warning(user + ' is now the highest bidder for this product', {
            autoClear: true,
            clearDuration: 4400
          });
        }
        comp.showMessage(user, productId, numberOfBids, highestBid);
      });
    });
  },
  connectAuction() {
    this.clearFeedback();
    const comp = this;
    const socket = new SockJS(Config.APP.SERVER_URL + '/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, function() {
      comp.set('connected', true);
      comp.stompClient.subscribe('/topic/auction/notification', function(message) {
        comp.empty();
        const productId = JSON.parse(message.body).productId;
        const productName = JSON.parse(message.body).productName;
        const user = JSON.parse(message.body).user;
        comp.get('notifications').clearAll().success('The auction for product ' + productName + ' has been finished. Congratulation! You outbid the competition.', {
          cssClasses: 'auctionFinishedNotification',
        });
        comp.showMessage(user, productName, productId);
      });
    });
  },
  disconnect() {
    this.clearFeedback();
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
    this.set('connected', false);
  },
  showMessage(user, productId, numberOfBids, highestBid) {
    this.add(user, productId, numberOfBids, highestBid);
  },
  sendBidMessage(user, productId, numberOfBids, highestBid) {
    if (this.stompClient != null && this.get('connected')) {
      this.stompClient.send("/app/bid/notification", {}, JSON.stringify({'user': user, 'productId': productId, 'numberOfBids': numberOfBids, 'highestBid': highestBid}));
    } else {
      this.set('feedback', 'You are not connected!');
    }
  },
  sendAuctionMessage(user, productName, productId) {
    if (this.stompClient != null && this.get('connected')) {
      this.stompClient.send("/app/auction/notification", {}, JSON.stringify({'user': user, 'productName': productName, 'productId': productId}));
    } else {
      this.set('feedback', 'You are not connected!');
    }
  },
  clearFeedback() {
    this.set('feedback', '');
  }
});
