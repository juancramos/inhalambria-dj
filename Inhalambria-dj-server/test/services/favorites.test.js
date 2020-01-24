const assert = require('assert');
const app = require('../.././/app');

describe('\'favorites\' service', () => {
  it('registered the service', () => {
    const service = app.service('favorites');

    assert.ok(service, 'Registered the service');
  });
});
