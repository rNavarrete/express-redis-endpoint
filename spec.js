var request = require('supertest');

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
            .get('/space')
            .expect(200, done);
    });
});