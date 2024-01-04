import React, { useEffect, useState } from 'react';
import styles from '../styles/Community.module.scss';
import CardPublic from '../components/folder/CardPublic';
import { addFolderPin, getFolders } from '../services/folderApi';
import Loading from '../components/ui/Loading';
import { follow } from '../services/followApi';
import { useNavigate, Link } from 'react-router-dom';

const Community = () => {
  const redirection = useNavigate();

  //폴더 요청
  const [folderInfo, setFolderInfo] = useState();
  const [clickFollow, setClickFollow] = useState('');

  const pageNo = 1;
  const size = 20;

  useEffect(() => {
    getFolders(pageNo, size, '').then((res) => setFolderInfo(res));
  }, []);

  useEffect(() => {
    follow(clickFollow);
  }, [clickFollow]);

  if (!folderInfo) {
    return <Loading />;
  }

  const { list, pageInfo, count } = folderInfo;

  console.log('list 확인: ', list);
  console.log(
    'followFlag 확인',

    list.map((l) => [l.id, l.userId, l.followFlag])
  );

  return (
    <div className={styles.wrapper}>
      <h2>Community</h2>
      <div className={styles.content}>
        {list.map((f) => (
          <CardPublic
            key={f.id}
            id={f.id}
            data={f}
            image={f.folderImg}
            profileImg={f.profileImage}
            title={f.title}
            writer={f.nickname}
            isMarked={f.pinFlag}
            isFollowed={f.followFlag}
            pin={f.pinCount}
            toId={f.userId}
            setClickFollow={setClickFollow}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
