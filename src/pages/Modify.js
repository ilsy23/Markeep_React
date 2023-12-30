import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "../styles/Modify.module.scss";
import { ReactComponent as Pen } from "../assets/icons/pencil.svg";
import { ReactComponent as Delete } from "../assets/icons/x.svg";
import { ReactComponent as Cancel } from "../assets/icons/x.svg";
import { ReactComponent as Add } from "../assets/icons/plus.svg";
import { ReactComponent as Save } from "../assets/icons/save.svg";
import { ReactComponent as Check } from "../assets/icons/check.svg";
import { ReactComponent as Camera } from "../assets/icons/camera-plus.svg";
import { multiStyles, toData } from "../styles/customStyles";
import Select from "react-select";
import { useInput } from "../hoc/useInput";

const Modify = () => {
  const folderInfo = useOutletContext();
  const { id, url, title, tags, ref } = folderInfo;
  const tagList = tags.map((tag, idx) => toData(tag, idx));
  const navigate = useNavigate();

  // 수정 상태 설정
  const [modify, setModify] = useState({
    modifySite: false,
    modifyTitle: false,
  });
  const changeModifyHandler = (e) => {
    const name = e.currentTarget.getAttribute("name");

    setModify({ ...modify, [name]: !modify[name] });
  };

  console.log("modify", modify);

  // 제목 입력 관리
  const [folderTitle, setFolderTitle] = useState(title);

  const clickTitleHandler = (e) => {
    setFolderTitle(titleInput);
    cancel();
    changeModifyHandler(e);
  };
  const [titleRef, titleInput, getTitle, cancel, enter] = useInput(
    title,
    clickTitleHandler
  );

  console.log("", titleInput);

  // 태그 리스트 상태 관리
  const [selectedTags, setSelectedTags] = useState(tagList);

  // 태그 입력 관리
  const clickAddHandler = () => {
    const tag = toData(keyword, selectedTags.length);
    setSelectedTags([...selectedTags, tag]);
    clickCancelHandler();
    inputRef.current.focus();
  };
  const [inputRef, keyword, getText, clickCancelHandler, keyDownHandler] =
    useInput("", clickAddHandler);

  const changeTagHandler = (selected) => {
    setSelectedTags(selected);
  };

  // 사이트 배열 불러오기
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

  // 사이트 삭제
  const clickDeleteHandler = (e) => {};

  // 사이트 수정 사항 저장
  const clickSiteSaveHandler = (e) => {
    changeModifyHandler(e);
  };

  // 폴더 수정 사항 저장
  const clickSaveHandler = () => {
    navigate("/mypage/folders/detail");
  };

  return (
    <div className={styles.wrap} ref={ref}>
      <div className={styles.box}>
        {/* 타이틀 */}
        {!modify.modifyTitle ? (
          <div className={styles.box}>
            <div>{folderTitle}</div>
            <div
              name="modifyTitle"
              className={styles.pencil}
              onClick={changeModifyHandler}
            >
              <Pen className={styles.icon} />
            </div>
          </div>
        ) : (
          <div className={styles.box}>
            <input
              name="modifyTitle"
              placeholder={folderTitle}
              onChange={getTitle}
              value={titleInput}
              onKeyDown={enter}
              ref={titleRef}
            />
            {titleInput ? (
              <div className={styles.cancel} onClick={cancel}>
                <Cancel className={styles.icon} />
              </div>
            ) : null}
            <div
              name="modifyTitle"
              className={styles.check}
              onClick={clickTitleHandler}
            >
              <Check className={styles.icon} />
            </div>
          </div>
        )}
      </div>
      {/* 폴더 이미지 */}
      <div className={styles.image_box}>
        <img src={url} alt="폴더 이미지" />
      </div>
      <label className={styles.icon_box} htmlFor="profile">
        <Camera className={styles.icon} />
        <input type="file" id="profile" style={{ display: "none" }} />
      </label>

      {/* 태그 */}
      <div className={styles.tag_box}>
        <div className={styles.input_box}>
          <input
            placeholder="태그 입력"
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
          <div className={styles.add} onClick={clickAddHandler}>
            <Add className={styles.icon} />
          </div>
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
          value={selectedTags}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
      </div>
      {/* 사이트 */}
      <div className={styles.site_box}>
        {sites.map((s) => {
          return (
            <div key={s.id}>
              <div className={styles.site}>
                <img src={s.url + "/favicon.ico"} alt="favicon" />
                <div>{s.title}</div>
                <div>{s.url}</div>
                <Delete
                  id={s.id}
                  className={styles.icon}
                  onClick={clickDeleteHandler}
                />
                <Pen
                  name="modifySite"
                  className={styles.icon}
                  onClick={changeModifyHandler}
                />
                <Save
                  name="modifySite"
                  id={s.id}
                  className={styles.icon}
                  onClick={clickSiteSaveHandler}
                />
              </div>
              <div className={styles.comment}>{s.comment}</div>
            </div>
          );
        })}
      </div>
      <button onClick={clickSaveHandler}>저장</button>
    </div>
  );
};

export default Modify;
