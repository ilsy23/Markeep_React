import React from "react";
import "./SignModal.scss";
import SnsLogin from "./login/SnsLogin";

const SignModal = ({ children }) => {
  console.log("tabName: ", children);

  return (
    <div className="modal-box">
      {children}
      <SnsLogin />
    </div>
  );
};

export default SignModal;
