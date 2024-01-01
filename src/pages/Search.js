import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardPublic from '../components/folder/CardPublic';
import styles from '../styles/Community.module.scss';
import { FOLDER } from '../config/host-config';
import useFetch, { getFolders } from '../services/folderApi';

const Search = () => {
  const bookmarkClickHandler = () => {};
  const followClickHandler = () => {};

  const { keyword } = useParams(); // 검색창에서 넘어온 키워드

  const [folderInfo, setFolderInfo] = useState();

  const pageNo = 1;
  const size = 10;

  useEffect(() => {
    setFolderInfo(getFolders(pageNo, size, keyword));
  }, []);

  if (!folderInfo) {
    return <div></div>;
  }

  console.log('folderInfo: ', folderInfo);
  const { list, page, count } = folderInfo;
  console.log(list, page, count);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {list.map((f) => (
          <CardPublic
            key={f.id}
            data={f}
            image={f.folderImg}
            profileImg={f.profileImage}
            title={f.title}
            writer={f.nickname}
            isMarked={f.pinFlag}
            isFollowed={f.followFlag}
            pin={f.pinCount}
            bookmarkClickHandler={bookmarkClickHandler}
            followClickHandler={followClickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
