import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types';

export default function (prevState = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...prevState, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...prevState, register: action.payload };
    case AUTH_USER:
      return { ...prevState, userData: action.payload }; // userData부분에 유저의 정보에 관한 모든 것이 들어있음
    default:
      return prevState;
  }
}
