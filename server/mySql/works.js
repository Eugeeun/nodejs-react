const { app } = require('../common');
const { connect } = require('./connect');

const workFunc = () => {
  app.get('/api/work', (req, res) => {
    const workQuery = 'select * from works';
    connect.query(workQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });
};

module.exports = { workFunc };
