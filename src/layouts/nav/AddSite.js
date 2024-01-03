import { useEffect, useRef, useState } from "react";
import { addSite, getMyFolders } from "../../services/folderApi";
import styles from "../../styles/AddSite.module.scss";
import Select from "react-select";
import { colors, customStyles } from "../../styles/customStyles";
import Input from "../../components/ui/Input";
import { ReactComponent as AddIcon } from "../../assets/icons/plus.svg";

const Add = () => {
  // 데이터 상태 관리
  const initialState = {
    folderId: "",
    title: "",
    url: "",
    comment: "",
    active: false,
    isValidUrl: false,
  };

  const [selected, setSelected] = useState(initialState);

  // 입력 검사 상태
  const [checkMsg, setCheckMsg] = useState({
    title: "",
    url: "",
  });

  const { folderId, title, url, comment, active, isValidUrl } = selected;
  const urlRef = useRef();
  const titleRef = useRef();
  const selectRef = useRef();

  // 버튼 활성화
  useEffect(() => {
    const activateButton = () => {
      if (folderId && title && isValidUrl) {
        setSelected((prev) => ({ ...prev, active: true }));
        return;
      }
      setSelected((prev) => ({ ...prev, active: false }));
    };
    activateButton();
  }, [folderId, title, isValidUrl]);

  // 데이터 입력 상태 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected((prev) => ({ ...prev, [name]: value }));
  };

  // 내 폴더 목록 요청
  const [folders, setFolders] = useState();

  useEffect(() => {
    getMyFolders().then((res) => setFolders(res));
  }, []);

  if (!folders) {
    return <div></div>;
  }

  // 폴더를 셀렉트 옵션으로 변환.
  const options = folders.map((f) => ({ value: f.id, label: f.title }));

  // 셀렉트 폴더 저장
  const handleSelectChange = (e) => {
    setSelected((prev) => ({ ...prev, folderId: e?.value }));
  };

  // title 입력 검사
  const handleTitleBlur = (e) => {
    if (!title) {
      setCheckMsg((prev) => ({
        ...prev,
        title: "북마크 이름을 입력해 주세요.",
      }));
      titleRef.current.focus();
      return;
    }
    setCheckMsg((prev) => ({ ...prev, title: "" }));
  };

  // url 유효성 검사
  const handleUrlKeyUp = (e) => {
    const urlRegex =
      /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

    if (!urlRegex.test(e.target.value)) {
      setCheckMsg((prev) => ({
        ...prev,
        url: "url 형식을 다시 확인해 주세요",
      }));
      setSelected((prev) => ({ ...prev, isValidUrl: false }));
      return;
    }
    setCheckMsg((prev) => ({ ...prev, url: "" }));
    setSelected((prev) => ({ ...prev, isValidUrl: true }));
  };

  const handleUrlBlur = (e) => {
    if (!isValidUrl) {
      urlRef.current.focus();
    }
  };

  // 북마크 추가 요청
  const handleAddClick = () => {
    addSite(folderId, title, url, comment).then((res) => {
      console.log("res", res.status);
      if (res.status === 200) {
        alert("북마크 등록 성공!");
        setSelected(initialState);
        selectRef.current.clearValue();
        return;
      }
      alert("북마크 등록에 실패했습니다.");
    });
  };

  return (
    <div className={styles.wrapper}>
      <Select
        id="select"
        ref={selectRef}
        autoFocus
        isClearable={true}
        isSearchable={true}
        placeholder={"폴더 선택"}
        options={options}
        onChange={handleSelectChange}
        maxMenuHeight={"160px"}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,

            neutral20: "rgba(187, 180, 254, 0.4)",
            primary: colors.purple,
            neutral80: colors.white,
            neutral60: colors.blue,
          },
        })}
      />
      <div className={styles.search}>
        <Input>
          <input
            id="title"
            type="text"
            name="title"
            placeholder="북마크 이름"
            value={title}
            onChange={handleChange}
            onBlur={handleTitleBlur}
            ref={titleRef}
          />
        </Input>
      </div>
      <div className={styles.search}>
        <Input>
          <input
            id="url"
            type="text"
            name="url"
            placeholder="북마크 주소"
            value={url}
            onChange={handleChange}
            onKeyUp={handleUrlKeyUp}
            onBlur={handleUrlBlur}
            ref={urlRef}
          />
        </Input>
      </div>
      <div className={styles.search}>
        <Input>
          <input
            id="comment"
            type="text"
            name="comment"
            placeholder="북마크 코멘트"
            value={comment}
            onChange={handleChange}
          />
        </Input>
      </div>
      <button
        className={active ? styles.activeButton : null}
        onClick={handleAddClick}
      >
        북마크 추가
        <AddIcon className={styles.icon} />
      </button>
    </div>
  );
};

export default Add;
