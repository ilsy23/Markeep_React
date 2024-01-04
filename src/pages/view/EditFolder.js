import React, { useRef, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import styles from "../../styles/EditFolder.module.scss";
import { ReactComponent as Pen } from "../../assets/icons/pencil.svg";
import { ReactComponent as Delete } from "../../assets/icons/trash.svg";
import { ReactComponent as Cancel } from "../../assets/icons/x.svg";
import { ReactComponent as Add } from "../../assets/icons/plus.svg";
import { ReactComponent as Save } from "../../assets/icons/save.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { ReactComponent as Camera } from "../../assets/icons/camera-plus.svg";
import SiteIcon from "../../assets/imgs/site.png";
import {
  colors,
  customStyles,
  multiStyles,
  toData,
} from "../../styles/customStyles";
import Select from "react-select";
import { useInput } from "../../hoc/useInput";
import { deleteSite } from "../../services/siteApi";
import { updateFolder } from "../../services/folderApi";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";

const EditFolder = () => {
  // Link에서 데이터 받아오기
  const { folder, sites } = useLocation().state.data;
  const { id, folderImg: url, title, tagNames: tags, hideFlag } = folder;
  console.log("folder: ", folder);

  const initialState = {
    title: "",
    savedTitle: title,
    tag: "",
    image: null,
    isPrivate: hideFlag,
  };

  // 폴더 입력값 관리
  const [folderInput, setFolderInput] = useState(initialState);
  const [src, setSrc] = useState();
  const titleRef = useRef();
  const tagRef = useRef();

  const handleFolderInputChange = (e) => {
    const { id, value } = e.target;
    setFolderInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleCancleClick = (e) => {
    e.stopPropagation();
    setFolderInput((prev) => ({ ...prev, [e.target.id]: "" }));
  };

  // 수정모드 관리
  const [modify, setModify] = useState("");

  const handleModifyClick = (e) => {
    console.log("클릭이벤트", e.currentTarget.id);
    setModify(e.currentTarget.id);
  };

  console.log("modify", modify);
  // 제목 수정 저장
  const handleSaveTitleClick = () => {
    if (!folderInput.title) {
      alert("폴더 이름을 작성해 주세요.");
      titleRef.current.focus();
      return;
    }
    setFolderInput((prev) => ({ ...prev, savedTitle: folderInput.title }));
    setModify("");
  };

  // 토글 상태 확인
  const handleToggleChange = (e) => {
    setFolderInput((prev) => ({ ...prev, isPrivate: e.target.checked }));
  };

  // 이미지 등록
  const imgRef = useRef();
  const handleImageChange = () => {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSrc(reader.result);
    };
    setFolderInput((prev) => ({ ...prev, image: file }));
  };

  // 태그 목록 관리
  const tagOptions = tags.map((tag, idx) => toData(tag, idx));
  const [selectedTags, setSelectedTags] = useState(tagOptions);
  const handleTagChange = (selected) => {
    setSelectedTags(selected);
  };

  const handleTagAddClick = (e) => {
    const tag = toData(folderInput.tag, selectedTags.length);
    setSelectedTags([...selectedTags, tag]);
    handleCancleClick(e);
    tagRef.current.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTagAddClick(e);
    }
  };

  // 폴더 수정 요청
  const saveModifiedFolder = () => {
    const updateData = {
      folderId: id,
      title: folderInput.savedTitle,
      hideFlag: folderInput.isPrivate,
      tags: selectedTags.map((t) => t.label),
    };

    updateFolder(updateData).then((res) => {
      if (res.status === 200) {
        setFolderInput(initialState);
        alert("폴더가 수정되었습니다.");
        return;
      }
      alert("폴더 수정에 실패했습니다. 다시 시도해 주세요.");
    });
  };

  // 사이트 입력 관리

  const initialSiteState = {
    title: "",
    url: "",
    titleMsg: "",
    urlMsg: "",
  };

  const [current, setCurrent] = useState(initialSiteState);

  const siteRef = useRef();
  const urlRef = useRef();

  const handleSiteInputChange = (e) => {
    const { name, value } = e.target;
    setCurrent((prev) => ({ ...prev, [name]: value }));
  };

  // url 유효성 관리
  const [isValidUrl, setIsValidUrl] = useState(false);

  const handleUrlKeyUp = (e) => {
    const urlRegex =
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

    if (!urlRegex.test(e.target.value)) {
      setCurrent((prev) => ({
        ...prev,
        urlMsg: "url 형식을 다시 확인해 주세요",
      }));
      setIsValidUrl(false);
      return;
    }
    setCurrent((prev) => ({ ...prev, urlMsg: "" }));
    setIsValidUrl(true);
  };

  const handleUrlBlur = () => {
    if (!isValidUrl) {
      urlRef.current.focus();
    }
  };

  const redirection = useNavigate();

  // 사이트 삭제
  const handleDeleteSiteClick = (e) => {
    // window.confirm("정말로 삭제하시겠습니까?");
    console.log("folderid", id, e.currentTarget.id);
    deleteSite(id, e.currentTarget.id).then((res) => {
      if (res.status !== 200) {
        alert("북마크 삭제에 실패했습니다. 다시 시도해 주세요.");
      }
      alert("북마크가 정상적으로 삭제되었습니다.");
      redirection("/mypage");
    });
  };

  // 사이트 변경사항 저장 요청
  const handleSaveSiteClick = (e) => {};

  // 사이트 변경 취소
  const handleCancelSaveClick = (e) => {
    setCurrent(initialSiteState);
    setModify("");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.box}>
        {/* 타이틀 */}
        {modify !== "title" ? (
          <div className={styles.title_box}>
            <div>{folderInput.savedTitle}</div>
            <Pen
              className={styles.icon}
              id="title"
              onClick={handleModifyClick}
            />
          </div>
        ) : (
          <div className={styles.title_box}>
            <input
              id="title"
              placeholder={title}
              onChange={handleFolderInputChange}
              value={folderInput.title}
              ref={titleRef}
            />
            {folderInput.title && (
              <Cancel
                className={styles.icon}
                id="title"
                onClick={handleCancleClick}
              />
            )}
            <Check className={styles.icon} onClick={handleSaveTitleClick} />
          </div>
        )}
      </div>
      {/* 폴더 이미지 */}
      <div className={styles.image_box}>
        <img
          src={url}
          alt="폴더 이미지"
          onError={(e) => (e.target.src = SiteIcon)}
        />
      </div>
      <label className={styles.icon_box} htmlFor="image">
        <Camera className={styles.icon} />
        이미지 변경
        <input
          type="file"
          id="image"
          name="image"
          ref={imgRef}
          onChange={handleImageChange}
          accept="image/*"
          style={{ display: "none" }}
        />
      </label>
      {/* 프라이빗 토글 */}
      <FormGroup>
        <FormControlLabel
          control={<Switch />}
          label="Private"
          onChange={handleToggleChange}
          defaultChecked={folderInput.isPrivate}
        />
      </FormGroup>
      {/* 태그 */}
      <div className={styles.tag_box}>
        <div className={styles.tag_box_input}>
          <input
            placeholder="태그 입력"
            id="tag"
            onChange={handleFolderInputChange}
            value={folderInput.tag}
            onKeyDown={handleKeyDown}
            ref={tagRef}
          />
          {folderInput.tag && (
            <Cancel
              className={styles.icon}
              id="tag"
              onClick={handleCancleClick}
            />
          )}
          <Add className={styles.icon} onClick={handleTagAddClick} />
        </div>
        <Select
          className={styles.select}
          defaultValue={selectedTags}
          isMulti
          styles={multiStyles(selectedTags)}
          isSearchable={false}
          isClearable={false}
          openMenuOnFocus={false}
          openMenuOnClick={false}
          onChange={handleTagChange}
          value={selectedTags}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
          }}
        />
        <button onClick={saveModifiedFolder}>폴더 수정</button>
      </div>
      {/* 사이트 */}
      <div className={styles.site_box}>
        {sites.length !== 0 &&
          sites.map((s) => {
            return (
              <div key={s.id}>
                <div className={styles.site}>
                  {modify !== s.id + "" && (
                    <>
                      <img src={s.url + "/favicon.ico"} alt="favicon" />
                      <div>{s.siteName}</div>
                      <div>{s.comment}</div>
                      <div>{s.url}</div>
                    </>
                  )}
                  {modify === s.id + "" && (
                    // title
                    <div className={styles.form}>
                      <div className={styles.input_box}>
                        <label htmlFor="title">이름</label>
                        <input
                          id="title"
                          name="title"
                          placeholder={s.siteName}
                          onChange={handleSiteInputChange}
                          value={current.title}
                          ref={siteRef}
                        />
                        {current.title ? (
                          <Cancel
                            className={styles.icon}
                            id="title"
                            onClick={handleCancleClick}
                          />
                        ) : null}
                        <div className={styles.msg}>{current.titleMsg}</div>
                      </div>
                      {/* url */}
                      <div className={styles.input_box}>
                        <label htmlFor="url">주소</label>
                        <input
                          id="url"
                          name="url"
                          placeholder={s.url}
                          onChange={handleSiteInputChange}
                          value={current.url}
                          ref={urlRef}
                          onKeyUp={handleUrlKeyUp}
                          onBlur={handleUrlBlur}
                        />
                        {current.title ? (
                          <Cancel
                            className={styles.icon}
                            id="tag"
                            onClick={handleCancleClick}
                          />
                        ) : null}
                        <div className={styles.msg}>{current.urlMsg}</div>
                      </div>
                    </div>
                  )}

                  {modify !== s.id + "" && (
                    <>
                      <div
                        className={styles.icon_box}
                        name={s.id}
                        id={s.id}
                        onClick={handleModifyClick}
                      >
                        <Pen className={styles.icon} name={s.id} id={s.id} />
                      </div>
                      <div
                        className={styles.icon_box}
                        id={s.id}
                        name={s.id}
                        onClick={handleDeleteSiteClick}
                      >
                        <Delete className={styles.icon} name={s.id} id={s.id} />
                      </div>
                    </>
                  )}
                  {modify === s.id + "" && (
                    <>
                      <div
                        className={styles.icon_box}
                        name={s.id}
                        id={s.id}
                        onClick={handleSaveSiteClick}
                      >
                        <Save className={styles.icon} name={s.id} id={s.id} />
                      </div>
                      <div
                        className={styles.icon_box}
                        name={s.id}
                        id={s.id}
                        onClick={handleCancelSaveClick}
                      >
                        <Cancel className={styles.icon} name={s.id} id={s.id} />
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.comment}>{s.comment}</div>
              </div>
            );
          })}
      </div>
      {/* <button onClick={clickSaveHandler}>저장</button> */}
    </div>
  );
};

export default EditFolder;
