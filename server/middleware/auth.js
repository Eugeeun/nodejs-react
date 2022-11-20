const { User } = require('../models/User');

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳
  // 1. 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 2. 토큰을 복화한 뒤 유저를 찾음
  User.findByToken(token, (err, user) => {
    if (err) throw err; // 에러가 있다면 에러를 던져줌 index.js에서 받겠지
    // 유저가 없으면 요 객체를 반환함 JSON형태임
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next(); // 얘를 왜 쓰는지 역할이 뭔지 알겠는데 원리를 모르겠다...
  });
  // 유저가 있으면 인증 성공 없으면 인증 실패
};

module.exports = { auth };
