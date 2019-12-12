import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home');
  this.route('shop');
  this.route('register');
  this.route('login');

  this.route('product', function() {
    this.route('show', { path: '/:product_id' });
  });
  this.route('account', function() {
    this.route('show', { path: '/:option' });
  });
});

export default Router;
