import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    // 이 주소로 정보를 날릴거야
    .post('/api/users/login', dataToSubmit)
    // 성공하면 데이터를 리턴해줘
    .then((response) => response.data);

  // 오브젝트를 리턴할건데
  console.log(request);
  return {
    type: LOGIN_USER, // 로그인 했음을 알려줌
    payload: request, // 로그인 정보를 알려줌
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data);

  console.log(request);
  return {
    type: REGISTER_USER,
    payload: request, // success를 줌
  };
}

export function auth() {
  const request = axios
    // 이 주소에서 정보를 얻을거야
    .get('/api/users/auth')
    // 성공하면 정보를 리턴해줘
    .then((response) => response.data);

  console.log(request);
  return {
    type: AUTH_USER,
    payload: request, // success를 줌
  };
}
