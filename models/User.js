const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jsonwebtoken = require('jsonwebtoken');

const TOKEN_KEY = 'tokenkey';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // jong won@naver.com 이렇게 치면 space를 없애주는 역할을 함
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// mongoose에서 저장하기 전에 콜백함수를 실행함
// 하 씨 근데 이거 뭔가 콜백지옥 같은데...
// 나중에 이거 콜백지옥으로부터 구원해낸다 내가 반드시
userSchema.pre('save', function (next) {
  let user = this;
  // 하.. 들여쓰기도 맘에 안 들어...
  if (user.isModified('password')) {
    // 비밀번호를 암호화 시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); // next()를 하게 되면 바로 index.js의 user.save()로 넘어감
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, callback) {
  // 1234567 암호화된 비밀번호
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  let user = this;
  // jsonwebtoken으로 token 생성하기
  let token = jsonwebtoken.sign(user._id.toHexString(), TOKEN_KEY);
  // user.id + TOKEN_KEY = token
  // 그래서 나중에 'TOKEN_KEY'를 넣으면 user.id가 나오게 됨
  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

userSchema.statics.findByToken = function (token, callback) {
  let user = this;

  // 토큰을 해독한다
  jsonwebtoken.verify(token, TOKEN_KEY, function (err, decoded) {
    // 유저 id를 이용해서 유저를 찾은 다음에
    // 클라이언트에서 가져온 토큰과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, callback) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
