import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardPublic from '../components/folder/CardPublic';
import styles from '../styles/Community.module.scss';
import { FOLDER } from '../config/host-config';

const Search = () => {
  const bookmarkClickHandler = () => {};
  const followClickHandler = () => {};

  const { keyword } = useParams(); // 검색창에서 넘어온 키워드
  console.log('keyword', keyword);
  // const { getFolders } = useFetch(); // 폴더 요청
  // console.log('getFolders', getFolders);

  const [folders, setFolders] = useState(null);

  const pageNo = 1;
  const size = 10;

  useEffect(() => {
    const fetchFolders = async () => {
      const res = await fetch(
        `${FOLDER}/all?page=${pageNo}&size=${size}&keyword=${keyword}`
      );
      const data = await res.json();
      console.log('폴더 목록 요청 확인: ', data);
      setFolders(data.list);
    };
    fetchFolders();
  }, [keyword]);

  const folderList = folders?.list;

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
