'use strict';

describe.only('api', function () {

  describe('Test server', function () {

    describe('/', function () {
      step('should return hello world from / route', function (done) {
        chai.request(server)
          .get('/')
          .end(function (err, res) {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.deep.equal({ hello: 'world' });
            done();
          });
      });
    });

    require('./neo');

  });

});
