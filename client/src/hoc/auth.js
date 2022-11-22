import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../_actions/user_action';
import { useNavigate } from 'react-router-dom';

export default function (SpecificComponent, option, adminRoute = null) {
  // option : null => 아무나 출입이 가능
  //          true => 로그인한 유저만
  //          false => 로그인한 유저는 출입 불가

  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        // console.log(response);

        // 로그인하지 않은 상태
        if (!response.payload.isAuth) {
          if (!option) {
            navigate('/login');
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.payload.isAdmin) {
            // 관리자가 아니면
            navigate('/');
          } else {
            // 관리자면
            if (!option) {
              // 접근이 가능 하다면
              navigate('/');
            }
          }
        }
      });
    }, []);

    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
