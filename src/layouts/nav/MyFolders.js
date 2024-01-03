import React, { useEffect, useState } from "react";
import styles from "../../styles/MyFolders.module.scss";
import Loading from "../../components/ui/Loading";
import { getMyFolders } from "../../services/folderApi";
import { Link, useLocation } from "react-router-dom";

const MyFolders = () => {
  const location = useLocation();
  const [folders, setFolders] = useState();

  useEffect(() => {
    getMyFolders().then((res) => setFolders(res));
  }, []);

  if (!folders) {
    return <Loading />;
  }

  return (
    <>
      <h2 className={styles.title}>내 폴더 목록</h2>
      <div className={styles.list}>
        <ul>
          {folders.map((f) => (
            <li key={f.id}>
              <Link
                to={`/view/folders/${f.id}`}
                state={{ previousLocation: location, data: f }}
                id={f.id}
              >
                {f.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MyFolders;
