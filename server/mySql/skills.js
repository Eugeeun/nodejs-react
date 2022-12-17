const { app } = require('../common');
const { connect } = require('./connect');

const skillsFunc = () => {
  app.get('/api/skill', (req, res) => {
    const skillQuery = 'select * from skills';
    connect.query(skillQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });

  app.get('/api/tool', (req, res) => {
    const toolQuery = 'select * from tools';
    connect.query(toolQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });

  app.get('/api/db', (req, res) => {
    const dbQuery = 'select * from db';
    connect.query(dbQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });
};

module.exports = { skillsFunc };
