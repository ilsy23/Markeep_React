import styles from "../styles/Mypage.module.scss";
import React, { useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { ReactComponent as Cancel } from "../assets/icons/x.svg";
import Folders from "../components/folder/Folders";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const MyPage = () => {
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef();

  const getText = (e) => {
    setKeyword(e.target.value);
  };

  const clickCancelHandler = (e) => {
    setKeyword("");
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      clickSearchHandler();
      inputRef.current.blur();
    }
  };

  const clickSearchHandler = (e) => {};

  // 토글
  const [alignment, setAlignment] = React.useState("web");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleBUttonClick = () => {
    setIsPrivate(!isPrivate);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>My Folder List</h2>
        <div className={styles.box}>
          <input
            placeholder="내 폴더 검색"
            onChange={getText}
            value={keyword}
            onKeyDown={keyDownHandler}
            ref={inputRef}
          />
          {keyword ? (
            <div className={styles.cancel} onClick={clickCancelHandler}>
              <Cancel className={styles.icon} />
            </div>
          ) : null}
          <div className={styles.search} onClick={clickSearchHandler}>
            <SearchIcon className={styles.icon} />
          </div>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="public" onClick={handleBUttonClick}>
              Public
            </ToggleButton>
            <ToggleButton value="private" onClick={handleBUttonClick}>
              Private
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className={styles.content}>
        <Folders isPrivate={isPrivate} />
      </div>
    </div>
  );
};

export default MyPage;
