const mongoose = require('mongoose');

// bcrypt는 Node.js 라이브러리인데 암호화에 이용됨
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

// mongoose에서 'save()'를 호출하기 전에 콜백함수를 실행함
userSchema.pre('save', function (next) {
  let user = this;
  // isModified() 함수는 파라미터로 들어온 값이 DB에 저장된 값과 비교해서
  // 변경된 경우는 true를 그렇지 않은 경우는 false를 반환
  // user 생성 시에는 항상 true, 수정되는 경우는 password가 변경되는 경우만 true
  if (user.isModified('password')) {
    // 유저가 생성되거나 비밀번호가 바뀐 경우라면 비밀번호를 암호화 시켜주어야 함

    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err); // next()를 하게 되면 바로 index.js의 user.save()로 넘어감

      // hash 암호화를 함
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
    // isMatch에 같으면 true가 담기고 다르면 false가 담김
    if (err) return callback(err); // 에러나면 에러를 리턴하고
    // 에러가 안 났으면 결과를 리턴 근데 인자에 순서가 있으니까
    // 순서를 잘 맞추어서 isMatch를 리턴
    callback(null, isMatch);
  });
};

userSchema.methods.generateToken = function (callback) {
  let user = this;
  // jsonwebtoken으로 token 생성하기
  let token = jsonwebtoken.sign(user._id.toString(), TOKEN_KEY); // 토큰 생성
  // user.id + TOKEN_KEY = token
  // 그래서 나중에 'TOKEN_KEY'를 넣으면 user.id가 나오게 됨
  user.token = token;
  user.save(function (err, user) {
    // MongoDB에 저장
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
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

const User = mongoose.model('User', userSchema);

module.exports = { User };
