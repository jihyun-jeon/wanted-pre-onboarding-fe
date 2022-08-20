import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { APP_API } from '../../config';
import * as S from '../../components/commonComp';

const Signup = () => {
  const [signupValue, setSignupValue] = useState({ email: '', password: '' });

  const SignupRequest = e => {
    e.preventDefault();

    fetch(`${APP_API.signup}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signupValue.email,
        password: signupValue.password,
      }),
    })
      .then(res => res.json())
      .then(result => {
        if (result.statusCode === 400) {
          alert('동일한 이메일이 이미 존재합니다.');
          return;
        }
        alert('회원가입 성공');
        setSignupValue({ email: '', password: '' });
      });
  };

  return (
    <>
      <h1>Sign up 회원가입</h1>
      <S.Form onSubmit={SignupRequest}>
        <S.LabelWrapper>
          <S.Label>
            <span>email</span>
            <S.InputBox
              inputType="email"
              name="email"
              value={signupValue.email}
              onChange={e =>
                setSignupValue(prev => ({ ...prev, email: e.target.value }))
              }
            />
          </S.Label>

          <S.Label>
            <span>Password</span>
            <S.InputBox
              inputType="password"
              name="password"
              length="8"
              value={signupValue.password}
              onChange={e =>
                setSignupValue(prev => ({ ...prev, password: e.target.value }))
              }
            />
          </S.Label>
        </S.LabelWrapper>

        <S.SubmitBtn>sign up</S.SubmitBtn>
        <Link to="/">
          go to sign in
          <S.GotoBtn>sign in</S.GotoBtn>
        </Link>
      </S.Form>
    </>
  );
};

export default Signup;
