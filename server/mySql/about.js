const { app } = require('../common');
const { connect } = require('./connect');

const aboutFunc = () => {
  app.get('/api/info', (req, res) => {
    const infoQuery = 'select * from infos';
    connect.query(infoQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });

  app.get('/api/major', (req, res) => {
    const majorQuery = 'select * from majors';
    connect.query(majorQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });

  app.get('/api/upnext', (req, res) => {
    const upnextQuery = 'select * from upnext';
    connect.query(upnextQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });
};

module.exports = { aboutFunc };
