import { useNavigate } from 'react-router-dom';
import { USER } from '../../config/host-config';
import { useContext, useEffect } from 'react';
import AuthContext from '../../context/AuthContext';

const NaverLogin = () => {
  const code = new URL(window.location.href).searchParams.get('code');
  console.log(code);
  const { onLogin } = useContext(AuthContext);
  //   const redirection = useNavigate();
  const API_REQUEST_URL = USER + '/naver-login?code=' + code;
  console.log(API_REQUEST_URL);
  useEffect(() => {
    NaverLogin();
  }, []);

  return <div>NaverLogin</div>;
};

export default NaverLogin;
