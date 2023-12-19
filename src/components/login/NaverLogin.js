import React, { useContext, useEffect } from "react";
import { API_BASE_URL, USER } from "../../config/host-config";
import AuthContext from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();
  const API_REQUEST_URL = API_BASE_URL + USER + "/naver-login?code=" + code;
  console.log(API_REQUEST_URL);

  useEffect(() => {
    const naverLogin = async () => {
      console.log("요청!!!");
      const res = await fetch(API_REQUEST_URL);

      const { accessToken, refreshToken, nickname, email } = await res.json();
      onLogin(accessToken, refreshToken, nickname, email);
    };
    naverLogin();
    redirection("/");
  }, []);

  return <div>NaverLogin</div>;
};

export default NaverLogin;
