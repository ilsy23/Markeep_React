import React, { useEffect, useState } from 'react';
import styles from '../styles/Community.module.scss';
import CardPublic from '../components/folder/CardPublic';
import { getFolders } from '../services/folderApi';
import Loading from '../components/ui/Loading';
import { follow } from '../services/followApi';
import { useNavigate } from 'react-router-dom';

const Community = () => {
  const redirection = useNavigate();
  const bookmarkClickHandler = () => {};
  const followClickHandler = (userId) => {
    follow(userId);
    // redirection('/');
  };

  // 폴더리스트 불러와서 map함수 써서 CardPublic 안에 속성으로 값 넣어주시면 돼요.
  // CardPublic에 값 넣는 예시는 아래 return문쪽에 CardPublic 컴포넌트 보시면 돼요!
  // td 이거 데이터 확인용 더미로 넣은 거니까 삭제하세요!
  const td = {
    image:
      'https://i.pinimg.com/564x/0d/e0/c0/0de0c0721c576c0e9fbd79abd6668089.jpg',
    profileImg:
      'https://i.pinimg.com/564x/e2/21/f0/e221f0954109ff15ad17ad7d05a1859b.jpg',
    isMarked: true,
    title: '테스트 제목입니다.',
    writer: 'chunsik',
    isFollowed: true,
    pin: 234,
    bookmarkClickHandler: { bookmarkClickHandler },
    followClickHandler: { followClickHandler },
  };

  //폴더 요청
  const [folderInfo, setFolderInfo] = useState();

  const pageNo = 1;
  const size = 20;

  useEffect(() => {
    getFolders(pageNo, size, '').then((res) => setFolderInfo(res));
  }, []);

  if (!folderInfo) {
    return <Loading />;
  }

  const { list, page, count } = folderInfo;
  console.log('list 확인: ', list);
  console.log(
    'followFlag 확인',
    list.map((l) => l.followFlag)
  );

  return (
    <div className={styles.wrapper}>
      <h2>Community</h2>
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
            toId={f.userId}
            bookmarkClickHandler={bookmarkClickHandler}
            followClickHandler={followClickHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default Community;
