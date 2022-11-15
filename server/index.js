const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

// application/x-www-form-urlencoded 이렇게 생긴 애를 분석해서 가져올 수 있게 해줌
app.use(bodyParser.urlencoded({ extended: true }));
// application/json을 분석해서 가져올 수 있게 함
app.use(bodyParser.json());
app.use(cookieParser());

const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World!~~'));

app.get('/api/hello', (req, res) => {
  res.send('hihi!!');
});

app.post('/api/users/register', (req, res) => {
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

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 DB에서 찾음
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }
    // 요청된 이메일이 DB에 있다면 비밀번호가 맞는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // 토큰을 저장해야함 쿠키, 로컬스토리지 등등..
        res
          .cookie('x_auth', user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
    // 비밀번호가 맞다면 토큰을 생성
  });
});

app.get('/api/users/auth', auth, (req, res) => {
  // 여기까지 왔다는 것은 미들웨어를 통과했다는 뜻 = auth가 true
  const currUser = req.user;
  res.status(200).json({
    _id: currUser._id,
    isAdmin: currUser.role === 0 ? false : true,
    isAuth: true,
    email: currUser.email,
    name: currUser.name,
    lastname: currUser.lastname,
    role: currUser.role,
    image: currUser.image,
  });
});

app.get('/api/users/logout', auth, (req, res) => {
  User.findByIdAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
