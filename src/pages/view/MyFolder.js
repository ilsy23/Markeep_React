import { Link, useLocation } from "react-router-dom";
import styles from "../../styles/MyFolder.module.scss";
import Select from "react-select";
import { ReactComponent as Up } from "../../assets/icons/up.svg";
import { ReactComponent as Down } from "../../assets/icons/down.svg";
import { multiStyles, toData } from "../../styles/customStyles";
import { useEffect, useState } from "react";
import Loading from "../../components/ui/Loading";
import { getSites } from "../../services/siteApi";
import SiteIcon from "../../assets/imgs/site.png";

const MyFolder = () => {
  const location = useLocation();
  const previousLocation = location.state.previousLocation;
  const folder = location.state.data;

  // 태그를 Select 객체로 변환
  const [openIdx, setOpenIdx] = useState([]);
  const { id, folderImg: url, title, tagNames: tags } = folder;
  const tagList = tags.map((tag, idx) => toData(tag, idx));

  // 사이트 목록 요청
  const [sites, setSites] = useState();
  useEffect(() => {
    getSites(id).then((res) => setSites(res));
  }, [id]);

  if (!sites) {
    return <Loading />;
  }

  // 코멘트 토글 로직
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

  return (
    <div className={styles.wrap}>
      <h4>{title}</h4>
      <div className={styles.image_box}>
        <img src={url} alt="폴더 이미지" />
      </div>
      <div className={styles.tag_box}>
        <Select
          defaultValue={tagList}
          isMulti
          styles={multiStyles(tagList)}
          isSearchable={false}
          isClearable={false}
          openMenuOnFocus={false}
          openMenuOnClick={false}
          placeholder={"No Tags..."}
          components={{
            DropdownIndicator: () => null,
            IndicatorSeparator: () => null,
            MultiValueRemove: () => null,
          }}
        />
      </div>
      <div className={styles.site_box}>
        {sites.map((s, idx) => {
          return (
            <div key={s.id}>
              <div className={styles.site}>
                {
                  <img
                    src={s.url + "/favicon.ico"}
                    alt="favicon"
                    onError={(e) => (e.target.src = SiteIcon)}
                  />
                }
                <div>{s.siteName}</div>
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
      <Link
        to={`/view/folders/${id}/edit`}
        state={{ previousLocation: previousLocation, data: { folder, sites } }}
      >
        수정
      </Link>
    </div>
  );
};

export default MyFolder;
