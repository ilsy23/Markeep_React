import React, { useEffect, useState } from "react";
import styles from "../../styles/Folders.module.scss";
import { getMyFolders } from "../../services/folderApi";
import CardPrivate from "./CardPrivate";

const Folders = ({ isPrivate }) => {
  const [folderInfo, setFolderInfo] = useState();

  useEffect(() => {
    getMyFolders().then((res) => setFolderInfo(res));
  }, []);

  if (!folderInfo) {
    return <div></div>;
  }
  console.log("folderInfo: ", folderInfo);

  return (
    <div className={styles.wrap}>
      {!isPrivate && (
        <div className={styles.group}>
          <h3>Public Folders</h3>
          <div className={styles.folders}>
            {folderInfo
              .filter((f) => !f.folder.hideFlag)
              .map((f) => {
                return (
                  <CardPrivate
                    key={f.folder.id}
                    id={f.folder.id}
                    title={f.folder.title}
                    url={f.folder.folderImg}
                    tags={f.tagNames}
                  />
                );
              })}
          </div>
        </div>
      )}
      {isPrivate && (
        <div className={styles.group}>
          <h3>Private Folders</h3>
          <div className={styles.folders}>
            {folderInfo
              .filter((f) => f.folder.hideFlag)
              .map((f) => {
                return (
                  <CardPrivate
                    key={f.folder.id}
                    id={f.folder.id}
                    title={f.folder.title}
                    url={f.folder.folderImg}
                    tags={f.tagNames}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Folders;
