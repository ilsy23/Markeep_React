import { useRef, useState } from "react";

export const useInput = (initial, action) => {
  const [keyword, setKeyword] = useState(initial);
  const inputRef = useRef();

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  const HandleCancelClick = () => {
    setKeyword("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      action(e);
      // inputRef.current.blur()
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
