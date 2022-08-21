import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { APP_API } from '../../config';
import * as S from '../../components/commonComp';

const SignIn = () => {
  const [signinValue, setSigninValue] = useState({ email: '', password: '' });

  const navigate = useNavigate();
  const location = useLocation().pathname;
  const isValid =
    signinValue.email.includes('@') && signinValue.password.length >= 8;

  useEffect(() => {
    if (localStorage.getItem('access_token') && location === '/') {
      navigate('/todo');
    }
  }, []);

  const singInRequest = e => {
    e.preventDefault();

    fetch(`${APP_API.signin}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signinValue.email,
        password: signinValue.password,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.error === 'Not Found') {
          alert('해당 사용자가 존재하지 않습니다.');
          return;
        }

        localStorage.setItem('access_token', result.access_token);
        alert('로그인 성공');
        navigate('/todo');
      });
  };

  return (
    <>
      <h1>Sign In 로그인</h1>
      <S.Form onSubmit={singInRequest}>
        <S.LabelWrapper>
          <S.Label>
            <span>email</span>
            <S.InputBox
              inputType="email"
              name="email"
              value={signinValue.eamil}
              onChange={e =>
                setSigninValue(prev => ({ ...prev, email: e.target.value }))
              }
            />
          </S.Label>

          <S.Label>
            <span>Password</span>
            <S.InputBox
              inputType="password"
              name="password"
              length="8"
              value={signinValue.password}
              onChange={e =>
                setSigninValue(prev => ({ ...prev, password: e.target.value }))
              }
            />
          </S.Label>
        </S.LabelWrapper>

        <S.SubmitBtn
          disabled={!isValid}
          cursor={!isValid ? 'not-allowed' : 'poiner'}
        >
          sign in
        </S.SubmitBtn>
        <Link to="/signup">
          go to sign up
          <S.GotoBtn>sign up</S.GotoBtn>
        </Link>
      </S.Form>
    </>
  );
};

export default SignIn;
