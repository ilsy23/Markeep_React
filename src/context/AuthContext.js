import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { USER } from "../config/host-config";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [loading, setLoading] = useState(true);
  const redirection = useNavigate();

  //컴포넌트가 렌더링 될 때 localStorage에서 로그인 정보를 가지고 와서 상태를 설정.
  useEffect(() => {
    console.log("AuthContext useEffect called");
    // 토큰 값이 유효한지 서버에 찔러보는 함수
    const testFunction = async () => {
      // console.log(
      //   'AuthContext useEffect token: ',
      //   localStorage.getItem('ACCESS_TOKEN')
      // );
      const requestHeader = {
        "content-type": "application/json",
        // JWT에 대한 인증 토큰이라는 타입을 선언
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      const res = await fetch(USER + "/status", {
        method: "GET",
        headers: requestHeader,
      });
      console.log("status: ", res.status);
      if (res.status === 400) {
        console.log("토큰값 유효하지 않음!");
        alert("다시 로그인 해주세요!");
        localStorage.clear();
        setLoading(false);
        setIsLoggedIn(false);
      }
    };
    testFunction();
    if (localStorage.getItem("isLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  // 로그아웃 핸들러
  const logoutHandler = () => {
    localStorage.clear(); // 로컬스토리지 내용 전체 삭제
    setIsLoggedIn(false);
    redirection("/");
  };

  // 로그인 핸들러
  const loginHandler = (token, refreshToken) => {
    localStorage.setItem("isLoggedIn", "1");
    // json에 담긴 인증정보를 클라이언트에 보관
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("REFRESH_TOKEN", refreshToken);
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
