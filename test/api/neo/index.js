'use strict';

describe('/neo', function () {

  step('fixture/work', function (done) {
    fixtures.restore('work', done);
  });

  require('./hazardous');
  require('./fastest');
  require('./bestYear');
  require('./bestMonth');

});
