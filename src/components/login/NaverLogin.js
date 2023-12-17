import React from "react";

const NaverLogin = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");

  console.log("code:", code, "state:", state);

  return <div>NaverLogin</div>;
};

export default NaverLogin;
