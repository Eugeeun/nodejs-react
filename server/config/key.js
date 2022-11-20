// process.env.NODE_ENV, 이 환경변수를 통해서 mode와 dev tool을 다르게 줄 수 있음
// process.env는 Node.js 앱이 동작할 리눅스/유닉스 시스템의 환경변수를 이용하는 것
// 즉 Node.js에서 process.env는 서버의 환경변수를 뜻함.
// => 서버의 환경변수가 미리 설정되어 있다면 타이핑하여 앱을 구동시키지 않아도 됨
// 만약 프로덕션 서버라면 미리 NODE_ENV=production이라는 환경변수를 미리 만들어 놓고
// 동작시키면 됨
if (process.env.NODE_ENV === 'production') {
  // 배포모드라면
  module.exports = require('./prod');
} else {
  // 개발모드라면
  // 로컬에서 실행시키면 여기로 오네
  module.exports = require('./dev');
}
