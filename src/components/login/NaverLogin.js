import React, { useContext, useEffect } from "react";
import { API_BASE_URL, USER } from "../../config/host-config";
import AuthContext from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";

const NaverLogin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  useEffect(() => {
    const naverLogin = async () => {
      const res = await fetch(
        API_BASE_URL + USER + "/naver-login?code=" + code
      );

      const { token, nickName, email } = await res.json();
      onLogin(token, nickName, email);
      redirection("/");
    };
  }, []);

  return <div>NaverLogin</div>;
};

export default NaverLogin;
