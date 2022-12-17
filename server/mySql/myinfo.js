const { app } = require('../common');
const { connect } = require('./connect');

const myInfoFunc = () => {
  app.get('/api/contact', (req, res) => {
    const contactQuery = 'select * from contacts';
    connect.query(contactQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });

  app.get('/api/link', (req, res) => {
    const linkQuery = 'select * from links';
    connect.query(linkQuery, (err, result, fields) => {
      if (err) console.log(err);
      res.json(result.map((item) => item));
    });
  });
};

module.exports = { myInfoFunc };
