var request = require('supertest');
// run tests with: mocha -R spec spec.js
describe('loading express', function () {
    var server;
    beforeEach(function () {
        server = require('./server');
    });
    afterEach(function (done) {
        server.close(done);
    });
    it('responds to /v1/launches/latest', function testLatest(done) {
        request(server)
            .get('/latest')
            .expect(200, done);
    });
});