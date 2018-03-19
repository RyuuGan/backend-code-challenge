'use strict';

describe('/best-month', function () {

  step('fixture/blank', function (done) {
    fixtures.restore('blank', done);
  });

  step('it should return null if no object found by default value (hazardous must be false)', function (done) {
    chai.request(server)
      .get('/neo/best-month')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.null;
        done();
      });
  });

  step('it should return null if no object found with query parameter hazardous=false', function (done) {
    chai.request(server)
      .get('/neo/best-month')
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
      .get('/neo/best-month')
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

  step('it should return month with most non hazardous asteroids using default value', function (done) {
    chai.request(server)
      .get('/neo/best-month')
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.an('number');
        expect(res.body.results).to.equal(2);
        done();
      });
  });

  step('it should return month with most non hazardous asteroids using query parameter hazardous=false', function (done) {
    chai.request(server)
      .get('/neo/best-month')
      .query({ hazardous: false })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.an('number');
        expect(res.body.results).to.equal(2);
        done();
      });
  });

  step('it should return month with most non hazardous asteroids using query parameter hazardous with any value', function (done) {
    chai.request(server)
      .get('/neo/best-month')
      .query({ hazardous: 'PARAM IS NOT TRUE OR FALSE' })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.an('number');
        expect(res.body.results).to.equal(2);
        done();
      });
  });

  step('it should return month with most non hazardous asteroids using query parameter hazardous=true', function (done) {
    chai.request(server)
      .get('/neo/best-month')
      .query({ hazardous: true })
      .end(function (err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.results).to.be.an('number');
        expect(res.body.results).to.equal(3);
        done();
      });
  });

});
