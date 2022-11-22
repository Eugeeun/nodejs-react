const express = require('express'); // node.js의 프레임워크인 express를 사용
const app = express();
const port = 5000; // 서버를 열 포트

// 요쳥된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어
// express의 request 객체에 cookies 속성이 부여됨
const cookieParser = require('cookie-parser');
const config = require('./config/key');
const { auth } = require('./middleware/auth');
const { User } = require('./models/User');

// body-parser: 클라이언트 post request data의 body로부터 파라미터를 편리하게 추출
// 근데 express에서 지원함
// application/json을 분석해서 가져올 수 있게 함
app.use(express.json());
// application/x-www-form-urlencoded 이렇게 생긴 애를 분석해서 가져올 수 있게 해줌
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // cookie-parser 사용

// Node.js와 MongoDB를 위한 ODM(Object Data Mapping) 라이브러리이다.
// ODM의 사용은 호환성이 없는 JavaScript Object와 MongoDB 데이터를 Mapping하여
// 간편한 CRUD를 가능하게 한다.
const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI, {
    // 이 옵션들은 서버 실행시 발생되는 오류를 제거하기 위한 것들임
    useNewUrlParser: true, // DB에 연결할 때 URL에 파싱
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

// '/'에 접속하면 클라이언트에게 'Hello World!~~'를 보내줘
app.get('/api', (req, res) => res.send('Hello World!~~'));

app.get('/api/hello', (req, res) => res.send('hihi!!'));

// '/api/users/register에서 뭔가를 보내면 받아줘 form이나 ajax
app.post('/api/users/register', (req, res) => {
  // 회원 가입할 때 필요한 정보들을 클라이언트에서 가져오면
  // 그것들을 데이터 베이스에 넣어줌

  const user = new User(req.body); // bodyParser덕분에 req를 json형태로 받을 수 있음

  // MongoDB에서 오는 api
  user.save((err, doc) => {
    // document.save() 형태임
    // Promise를 반환하기 때문에 callback이나 async/await으로 처리 가능
    // 자동으로 _id도 부여
    if (err) return res.json({ success: false, err });
    // 성공하면 success: true 객체를 반환해줘
    return res.status(200).json({
      success: true,
    });
  });
});

app.post('/api/users/login', (req, res) => {
  // 요청된 이메일을 DB에서 찾음
  // Model.findOne({key: value}) 이 key: value에 해당하는 문서를 찾음
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
        // 비밀번호가 틀렸으면
        return res.json({
          loginSuccess: false,
          message: '비밀번호가 틀렸습니다.',
        });

      // 비밀번호가 맞다면 토큰을 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).json(err);
        // 토큰을 저장해야함 쿠키, 로컬스토리지 등등..
        res
          .cookie('x_auth', user.token) // 'x_auth'의 이름으로 쿠키 설정
          .status(200) // 성공했다는 뜻
          .json({ loginSuccess: true, userId: user._id });
      });
    });
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

// '/api/users/logout 페이지에 접속하면
app.get('/api/users/logout', auth, (req, res) => {
  // DB를 업데이트 할 거임
  // id를 찾아서 그 토큰을 지워줌 => 로그아웃으로 표시
  User.findByIdAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
