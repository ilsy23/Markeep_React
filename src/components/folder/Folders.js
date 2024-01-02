import React, { useEffect, useState } from "react";
import styles from "../../styles/Folders.module.scss";
import { getMyFolders } from "../../services/folderApi";
import CardPrivate from "./CardPrivate";

const Folders = ({ isPrivate }) => {
  const [folders, setFolders] = useState();

  useEffect(() => {
    getMyFolders().then((res) => setFolders(res));
  }, []);

  if (!folders) {
    return <div></div>;
  }
  console.log("folders: ", folders);

  return (
    <div className={styles.wrap}>
      {!isPrivate && (
        <div className={styles.group}>
          <h3>Public Folders</h3>
          <div className={styles.folders}>
            {folders
              .filter((f) => !f.hideFlag)
              .map((f) => {
                return (
                  <CardPrivate
                    key={f.id}
                    id={f.id}
                    data={f}
                    title={f.title}
                    url={f.folderImg}
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
            {folders
              .filter((f) => f.hideFlag)
              .map((f) => {
                return (
                  <CardPrivate
                    key={f.id}
                    id={f.id}
                    title={f.title}
                    url={f.folderImg}
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
