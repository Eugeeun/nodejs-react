const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/User');

// application/x-www-form-urlencoded 이렇게 생긴 애를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));
// application/json을 분석해서 가져올 수 있게 함
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World!~~'));

app.post('/register', (req, res) => {
  // 회원 가입할 때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터 베이스에 넣어줌

  const user = new User(req.body); // bodyParser덕분에 req를 json형태로 받을 수 있음
  // MongoDB에서 오는 api
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    // 성공하면 success: true 객체를 반환해줘
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
