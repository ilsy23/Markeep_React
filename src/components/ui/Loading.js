import React from "react";
import { ReactComponent as Spinner } from "../../assets/icons/Spinner.svg";

const Loading = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "80vh",
        left: 0,
        top: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Spinner />
    </div>
  );
};

export default Loading;
