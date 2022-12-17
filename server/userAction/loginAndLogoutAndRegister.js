const { app } = require('../common');
const { auth } = require('../middleware/auth');
const { User } = require('../models/User');

const loginOutRegisterFunc = () => {
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
    User.findByIdAndUpdate(
      { _id: req.user._id },
      { token: '' },
      (err, user) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true });
      }
    );
  });
};

module.exports = { loginOutRegisterFunc };
