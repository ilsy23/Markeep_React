import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { USER } from '../../config/host-config';

const KakaoLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  const { onLogin } = useContext(AuthContext);
  //   const navigate = useNavigate();
  const API_REQUEST_URL = USER + '/kakao-login?code=' + code;

  useEffect(() => {
    const kakaoLogin = async () => {
      console.log('카카오 로그인 요청!!!');
      const res = await fetch(API_REQUEST_URL);

      console.log('res: ', res);

      const { accessToken, refreshToken } = await res.json();
      onLogin(accessToken, refreshToken);
    };
    kakaoLogin();
    // redirection('/');
  }, []);

  return <div>KakaoLogin</div>;
};

export default KakaoLogin;
