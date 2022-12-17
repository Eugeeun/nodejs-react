const { app } = require('./common');
const { port } = require('./common');

// 요쳥된 쿠키를 쉽게 추출할 수 있도록 도와주는 미들웨어
// express의 request 객체에 cookies 속성이 부여됨
const cookieParser = require('cookie-parser');
const config = require('./config/key');
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

const { aboutFunc } = require('./mySql/about');
const { myInfoFunc } = require('./mySql/myinfo');
const { skillsFunc } = require('./mySql/skills');
const { workFunc } = require('./mySql/works');
const {
  loginOutRegisterFunc,
} = require('./userAction/loginAndLogoutAndRegister');
aboutFunc();
myInfoFunc();
skillsFunc();
workFunc();
loginOutRegisterFunc();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
