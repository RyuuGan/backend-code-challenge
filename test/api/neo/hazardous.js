'use strict';

describe('/hazardous', function () {

  step('fixture/blank', function (done) {
    fixtures.restore('blank', done);
  });

  step('it should return 0 length array if no hazardous found', function (done) {
    chai.request(server)
      .get('/neo/hazardous')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body.results)).to.be.true;
        expect(res.body.results.length).to.equal(0);
        done();
      });
  });

  step('fixture/work', function (done) {
    fixtures.restore('work', done);
  });

  step('it should return 4 hazardous found', function (done) {
    chai.request(server)
      .get('/neo/hazardous')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body.results)).to.be.true;
        expect(res.body.results.length).to.equal(4);

        let hazardous = res.body.results.find(a => a.name === "(2016 TY92)");
        expect(hazardous).to.be.an('object');
        expect(hazardous.name).to.equal('(2016 TY92)');
        done();
      });
  });

});
