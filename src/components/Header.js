import React, { useEffect, useState } from "react";
import serachIcon from "../assets/img/search.svg";
import "./Header.scss";
import SignModal from "./SignModal";

const Header = () => {
  const [signInTabOn, setSignInTabOn] = useState(false);
  const [signUpTabOn, setSignUpTabOn] = useState(false);

  const handleSignTabClick = (signIn) => {
    if (signIn) {
      setSignInTabOn(!signInTabOn);
      setSignUpTabOn(false);
    } else {
      setSignUpTabOn(!signUpTabOn);
      setSignInTabOn(false);
    }
  };

  return (
    <>
      <div className="header">
        <h2 className="logo">MarKeep</h2>
        <div className="input-box">
          <input className="search" placeholder="검색어를 입력하세요." />
          <img className="icon" alt="Icon" src={serachIcon} />
        </div>
        <ul className="sign-nav">
          <li onClick={() => handleSignTabClick(true)}>Sign In</li>
          <li onClick={() => handleSignTabClick(false)}>Sign Up</li>
        </ul>
      </div>
      {signInTabOn && <SignModal>signIn</SignModal>}
      {signUpTabOn && <SignModal>signUp</SignModal>}
    </>
  );
};

export default Header;
