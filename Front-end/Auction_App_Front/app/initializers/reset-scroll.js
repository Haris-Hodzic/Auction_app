import ResetScroll from '../mixins/reset-scroll';
import Route from '@ember/routing/route';

export function initialize( /* application */ ) {
  Route.reopen(ResetScroll);
}

export default {
  name: 'reset-scroll',
  initialize
};