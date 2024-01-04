// import React, { useRef, useState } from "react";
// import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
// import styles from "../../styles/EditFolder.module.scss";
// import { ReactComponent as Pen } from "../../assets/icons/pencil.svg";
// import { ReactComponent as Delete } from "../../assets/icons/x.svg";
// import { ReactComponent as Cancel } from "../../assets/icons/x.svg";
// import { ReactComponent as Add } from "../../assets/icons/plus.svg";
// import { ReactComponent as Save } from "../../assets/icons/save.svg";
// import { ReactComponent as Check } from "../../assets/icons/check.svg";
// import { ReactComponent as Camera } from "../../assets/icons/camera-plus.svg";
// import {
//   colors,
//   customStyles,
//   multiStyles,
//   toData,
// } from "../../styles/customStyles";
// import Select from "react-select";
// import { useInput } from "../../hoc/useInput";

const EditFolder = () => {
  // // Link에서 데이터 받아오기
  // const { folder, sites } = useLocation().state.data;
  // const { id, folderImg: url, title, tagNames: tags } = folder;
  // console.log("folder: ", folder);
  // // 폴더 입력값 상태 관리
  // const [input, setInput] = useState({
  //   title: "",
  //   tag: "",
  // });
  // const handleFolderInputChange = (e) => {
  //   const [name, value] = e.target;
  //   setInput((prev) => ({ ...prev, [name]: value }));
  // };
  // const handleKeyDown = (e) => {
  //   if (e.key === "Enter") {
  //     action(e);
  //   }
  // }
  // // 태그 목록 관리
  // const tagOptions = tags.map((tag, idx) => toData(tag, idx));
  // const [selectedTags, setSelectedTags] = useState(tagOptions);
  // const handleTagChange = (selected) => {
  //   setSelectedTags(selected);
  // };
  // const navigate = useNavigate();
  // const inputRef = useRef();
  // const handleChange = (e) => {
  //   inputRef.current.setValue(e);
  //   console.log("e.", inputRef.current);
  // };
  // const placeholder = "입력";
  // return (
  //   <div className={styles.wrap}>
  //     <div className={styles.box}>
  //       {/* 타이틀 */}
  //       {!modify.modifyTitle ? (
  //         <div className={styles.box}>
  //           <div>{title}</div>
  //           <div
  //             name="modifyTitle"
  //             className={styles.pencil}
  //             onClick={changeModifyHandler}
  //           >
  //             <Pen className={styles.icon} />
  //           </div>
  //         </div>
  //       ) : (
  //         <div className={styles.box}>
  //           <input
  //             name="title"
  //             placeholder={title}
  //             onChange={handleFolderInputChange}
  //             value={input.title}
  //             onKeyDown={enter}
  //             ref={titleRef}
  //           />
  //           {titleInput ? (
  //             <div className={styles.cancel} onClick={cancel}>
  //               <Cancel className={styles.icon} />
  //             </div>
  //           ) : null}
  //           <div
  //             name="modifyTitle"
  //             className={styles.check}
  //             onClick={clickTitleHandler}
  //           >
  //             <Check className={styles.icon} />
  //           </div>
  //         </div>
  //       )}
  //     </div>
  //     {/* 폴더 이미지 */}
  //     <div className={styles.image_box}>
  //       <img src={url} alt="폴더 이미지" />
  //     </div>
  //     <label className={styles.icon_box} htmlFor="image">
  //       <Camera className={styles.icon} />
  //       <input
  //         type="file"
  //         id="image"
  //         name="image"
  //         // ref={imgRef}/
  //         // onChange={handleImageChange}
  //         accept="image/*"
  //         style={{ display: "none" }}
  //       />
  //     </label>
  //     {/* 태그 */}
  //     <div className={styles.tag_box}>
  //       <div className={styles.input_box}>
  //         <input
  //           placeholder="태그 입력"
  //           name="tag"
  //           onChange={handleFolderInputChange}
  //           value={keyword}
  //           onKeyDown={keyDownHandler}
  //           ref={inputRef}
  //         />
  //         {keyword ? (
  //           <div className={styles.cancel} onClick={clickCancelHandler}>
  //             <Cancel className={styles.icon} />
  //           </div>
  //         ) : null}
  //         <div className={styles.add} onClick={clickAddHandler}>
  //           <Add className={styles.icon} />
  //         </div>
  //       </div>
  //       <Select
  //         defaultValue={selectedTags}
  //         isMulti
  //         styles={multiStyles(selectedTags)}
  //         isSearchable={false}
  //         isClearable={false}
  //         openMenuOnFocus={false}
  //         openMenuOnClick={false}
  //         onChange={handleTagChange}
  //         value={selectedTags}
  //         components={{
  //           DropdownIndicator: () => null,
  //           IndicatorSeparator: () => null,
  //         }}
  //       />
  //     </div>
  //     {/* 사이트 */}
  //     <div className={styles.site_box}>
  //       {sites.length &&
  //         sites.map((s) => {
  //           return (
  //             <div key={s.id}>
  //               <div className={styles.site}>
  //                 <img src={s.url + "/favicon.ico"} alt="favicon" />
  //                 <div>{s.title}</div>
  //                 <div>{s.url}</div>
  //                 <Delete
  //                   id={s.id}
  //                   className={styles.icon}
  //                   onClick={clickDeleteHandler}
  //                 />
  //                 <Pen
  //                   name="modifySite"
  //                   className={styles.icon}
  //                   onClick={changeModifyHandler}
  //                 />
  //                 <Save
  //                   name="modifySite"
  //                   id={s.id}
  //                   className={styles.icon}
  //                   onClick={clickSiteSaveHandler}
  //                 />
  //               </div>
  //               <div className={styles.comment}>{s.comment}</div>
  //             </div>
  //           );
  //         })}
  //     </div>
  //     <button onClick={clickSaveHandler}>저장</button>
  //   </div>
  // );
};

export default EditFolder;
