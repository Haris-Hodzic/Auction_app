import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Validator | username-available', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    const validator = this.owner.lookup('validator:username-available');
    assert.ok(validator);
  });
});
