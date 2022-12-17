const express = require('express'); // node.js의 프레임워크인 express를 사용
const app = express();
const port = 5000; // 서버를 열 포트

// body-parser: 클라이언트 post request data의 body로부터 파라미터를 편리하게 추출
// 근데 express에서 지원함
// application/json을 분석해서 가져올 수 있게 함
app.use(express.json());
// application/x-www-form-urlencoded 이렇게 생긴 애를 분석해서 가져올 수 있게 해줌
app.use(express.urlencoded({ extended: true }));

module.exports = { app, port, express };
