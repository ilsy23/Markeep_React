import { useRef, useState } from "react";

export const useInput = (initial, action) => {
  const [keyword, setKeyword] = useState(initial);
  const inputRef = useRef();

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const HandleCancelClick = () => {
    setKeyword("");
    // inputRef.current.blur()
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      action(e);
    }
  };

  return {
    inputRef,
    keyword,
    handleInputChange,
    HandleCancelClick,
    handleKeyDown,
  };
};
