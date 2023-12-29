import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../styles/Modify.module.scss";
import { ReactComponent as Down } from "../assets/icons/down.svg";
import { ReactComponent as Up } from "../assets/icons/up.svg";
import { ReactComponent as Cancel } from "../assets/icons/x-circle.svg";
import { ReactComponent as Add } from "../assets/icons/plus.svg";
import { multiStyles, toData } from "../styles/customStyles";
import Select from "react-select";
import { useInput } from "../hoc/useInput";

const Modify = () => {
  const folderInfo = useOutletContext();
  const [openIdx, setOpenIdx] = useState([]);
  const { id, url, title, tags, ref } = folderInfo;
  const tagList = toData(tags);
  const [selectedTags, setSelectedTags] = useState(tagList);

  // 태그 입력 관리
  const clickAddHandler = () => {
    const tag = toData([keyword]);
    setSelectedTags([...selectedTags, tag]);
  };
  const [inputRef, keyword, getText, clickCancelHandler, keyDownHandler] =
    useInput("", clickAddHandler);

  const sites = [];

  for (let i = 0; i < 10; i++) {
    const s = {
      id: `site${i}`,
      title: `사이트이름${i}`,
      url: "https://m.naver.com",
      comment: "사이트에 대한 설명입니다.",
    };
    sites.push(s);
  }

  const clickSaveHandler = () => {};
  const clickDownHandler = (e) => {
    const idx = parseInt(e.currentTarget.id, 10);
    setOpenIdx([...openIdx, idx]);
  };
  const clickUpHandler = (e) => {
    const idx = parseInt(e.currentTarget.id, 10);
    if (openIdx.includes(idx)) {
      setOpenIdx(openIdx.filter((f) => f !== idx));
    }
  };
  const changeTagHandler = (selected) => {
    setSelectedTags(selected);
  };

  return (
    <div className={styles.wrap} ref={ref}>
      <h4>{title}</h4>
      <div className={styles.image_box}>
        <img src={url} alt="폴더 이미지" />
      </div>
      <div className={styles.tag_box}>
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
        <div className={styles.search} onClick={clickAddHandler}>
          <Add className={styles.icon} />
        </div>
        <Select
          defaultValue={selectedTags}
          isMulti
          styles={multiStyles(selectedTags)}
          isSearchable={false}
          isClearable={false}
          openMenuOnFocus={false}
          openMenuOnClick={false}
          onChange={changeTagHandler}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />

        {/* {tags.map((tag, idx) => {
          return (
            <div key={idx} className={styles.tag}>
              {tag}
            </div>
          );
        })} */}
      </div>
      <div className={styles.site_box}>
        {sites.map((s, idx) => {
          return (
            <div key={s.id}>
              <div className={styles.site}>
                <img src={s.url + "/favicon.ico"} alt="favicon" />
                <div>{s.title}</div>
                <div>{s.url}</div>
                {openIdx.includes(idx) ? (
                  <Up
                    id={idx}
                    className={styles.icon}
                    onClick={clickUpHandler}
                  />
                ) : (
                  <Down
                    id={idx}
                    className={styles.icon}
                    onClick={clickDownHandler}
                  />
                )}
              </div>
              {openIdx.includes(idx) && (
                <div className={styles.comment}>{s.comment}</div>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={clickSaveHandler}>저장</button>
    </div>
  );
};

export default Modify;
