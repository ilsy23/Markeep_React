import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hoc/useFetch';
import CardPublic from '../components/folder/CardPublic';
import styles from '../styles/Community.module.scss';

const Search = () => {
  const bookmarkClickHandler = () => {};
  const followClickHandler = () => {};

  const { keyword } = useParams(); // 검색창에서 넘어온 키워드
  const { getFolders } = useFetch(); // 폴더 요청

  const [folders, setFolders] = useState(null);

  const pageNo = 1;
  const size = 10;

  useEffect(() => {
    getFolders(pageNo, size, keyword).then((res) => setFolders(res));
  }, [getFolders, keyword]);

  const folderList = folders.list;

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {folderList.map((f) => (
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
