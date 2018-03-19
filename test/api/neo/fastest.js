'use strict';

describe('/fastest', function () {

  step('fixture/blank', function (done) {
    fixtures.restore('blank', done);
  });

  step('it should return null if no object found by default value (hazardous must be false)', function (done) {
    chai.request(server)
      .get('/neo/fastest')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.null;
        done();
      });
  });

  step('it should return null if no object found with query parameter hazardous=false', function (done) {
    chai.request(server)
      .get('/neo/fastest')
      .query({ hazardous: false })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.null;
        done();
      });
  });

  step('it should return null if no object found with query parameter hazardous=true', function (done) {
    chai.request(server)
      .get('/neo/fastest')
      .query({ hazardous: true })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.null;
        done();
      });
  });

  step('fixture/work', function (done) {
    fixtures.restore('work', done);
  });

  step('it should return fastest asteroid using default value (hazardous must be false)', function (done) {
    chai.request(server)
      .get('/neo/fastest')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.an('object');
        expect(res.body.results._id).to.equal('5aae0af7cb089e39a4755010');
        expect(res.body.results.name).to.equal('483563 (2004 BD68)');
        expect(res.body.results.isHazardous).to.be.false;
        done();
      });
  });

  step('it should return fastest asteroid using query parameter hazardous=false', function (done) {
    chai.request(server)
      .get('/neo/fastest')
      .query({ hazardous: false })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.an('object');
        expect(res.body.results._id).to.equal('5aae0af7cb089e39a4755010');
        expect(res.body.results.name).to.equal('483563 (2004 BD68)');
        expect(res.body.results.isHazardous).to.be.false;
        done();
      });
  });

  step('it should return fastest asteroid using query parameter hazardous with any value', function (done) {
    chai.request(server)
      .get('/neo/fastest')
      .query({ hazardous: 'PARAM IS NOT TRUE OR FALSE' })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.an('object');
        expect(res.body.results._id).to.equal('5aae0af7cb089e39a4755010');
        expect(res.body.results.name).to.equal('483563 (2004 BD68)');
        expect(res.body.results.isHazardous).to.be.false;
        done();
      });
  });

  step('it should return fastest asteroid using query parameter hazardous=true', function (done) {
    chai.request(server)
      .get('/neo/fastest')
      .query({ hazardous: true })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.an('object');
        expect(res.body.results._id).to.equal('5aad5428e7f3472e0cf883c6');
        expect(res.body.results.name).to.equal('6037 (1988 EG)');
        expect(res.body.results.isHazardous).to.be.true;
        done();
      });
  });

});
