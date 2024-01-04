import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/Folder.module.scss";
import { ReactComponent as PinViewIcon } from "../../assets/icons/pin.svg";
import { toData } from "../../styles/customStyles";
import { getSites } from "../../services/siteApi";
import Loading from "../../components/ui/Loading";
import SiteIcon from "../../assets/imgs/site.png";
import { ReactComponent as Up } from "../../assets/icons/up.svg";
import { ReactComponent as Down } from "../../assets/icons/down.svg";

const Folder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const previousLocation = location.state.previousLocation;
  const folder = location.state.data;

  const {
    id,
    title,
    userId,
    nickname,
    folderImg,
    profileImage,
    pinFlag,
    followFlag,
    pinCount,
    tagNames,
  } = folder;

  // 태그를 Select 객체로 변환
  const [openIdx, setOpenIdx] = useState([]);
  const tagList = tagNames?.map((tag, idx) => toData(tag, idx));

  // 사이트 목록 요청
  const [sites, setSites] = useState();
  useEffect(() => {
    getSites(id)
      .then((res) => {
        setSites(res);
        return;
      })
      .catch((e) => {
        alert("로그인이 필요한 서비스입니다.");
        navigate("/");
        return;
      });
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

  // 팔로우 클릭
  const handleFollowClick = (e) => {};

  // 핀 클릭
  const handlePinClick = (e) => {};

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h2>{title}</h2>
        <div className={styles.user}>
          <div className={styles.group}>
            <div className={styles.image_box}>
              <img src={profileImage} alt="프로필 이미지" />
            </div>
            <div className={styles.nickname}>{nickname}</div>
            <button
              className={followFlag && styles.followed}
              onClick={handleFollowClick}
            >
              {followFlag ? "Following" : "Follow"}
            </button>
          </div>
          <div className={styles.group}>
            <div className={styles.icon_box}>
              <PinViewIcon className={styles.icon} />
            </div>
            {pinCount}
            <button
              className={pinFlag && styles.followed}
              onClick={handlePinClick}
            >
              {pinFlag ? "Following" : "Follow"}
            </button>
          </div>
          <div className={styles.image_box}>
            <img src={folderImg} alt="폴더 이미지" />
          </div>
          <div className={styles.site_box}>
            <ul>
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Folder;
