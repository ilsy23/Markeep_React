import React, { useEffect, useState } from "react";
import styles from "../../styles/UserInfo.module.scss";
import { ReactComponent as Pencil } from "../../assets/icons/pencil.svg";
import { ReactComponent as Cancel } from "../../assets/icons/x.svg";
import { ReactComponent as Check } from "../../assets/icons/check.svg";
import { getProfile } from "../../services/userApi";

const UserInfo = () => {
  const [profile, setProfile] = useState();
  const [change, setChange] = useState(false);
  const [nick, setNick] = useState("");

  useEffect(() => {
    getProfile().then((res) => setProfile(res));
  }, []);

  if (!profile) {
    return <div></div>;
  }

  console.log("profile: ", profile);

  const { nickname, email, profileImage, followerCount, followingCount } =
    profile;

  const clickChangeHandler = () => {
    setChange(true);
  };

  const clickSaveHandler = () => {
    setChange(false);
    setNick("");
  };

  const getText = (e) => {
    setNick(e.target.value);
  };

  const clickCancelHandler = () => {
    setNick("");
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.profile}>
        <div className={styles.img_box}>
          <img src={profileImage} alt="프로필 사진" />
        </div>
        <label className={styles.icon_box} htmlFor="profile">
          <Pencil className={styles.icon} />
          <input type="file" id="profile" style={{ display: "none" }} />
        </label>
      </div>
      <div>{email}</div>
      {!change ? (
        <div className={styles.box}>
          <div>{nickname}</div>
          <div className={styles.pencil} onClick={clickChangeHandler}>
            <Pencil className={styles.icon} />
          </div>
        </div>
      ) : (
        <div className={styles.box}>
          <input
            name="nickname"
            placeholder={nickname}
            onChange={getText}
            value={nick}
          />
          {nick ? (
            <div className={styles.cancel} onClick={clickCancelHandler}>
              <Cancel className={styles.icon} />
            </div>
          ) : null}
          <div className={styles.check} onClick={clickSaveHandler}>
            <Check className={styles.icon} />
          </div>
        </div>
      )}

      {/* <button>비밀번호 변경</button> */}
    </div>
  );
};

export default UserInfo;
