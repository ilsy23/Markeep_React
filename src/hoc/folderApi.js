import { FOLDER, SITE, USER } from '../config/host-config';

const token = localStorage.getItem('ACCESS_TOKEN');
const requestTokenHeader = {
  'content-type': 'application/json',
  Authorization: 'Bearer ' + token,
};
export const requestHeader = {
  'content-type': 'application/json',
};

// 폴더 목록 요청
export async function getFolders(pageNo, size, keyword) {
  console.log('getFolders 함수 호출');

  const res = await fetch(
    `${FOLDER}/all?page=${pageNo}&size=${size}&keyword=${keyword}`
  );
  const folders = await res.json();
  const list = await folders.list;
  const page = await folders.pageInfo;
  const count = await folders.count;
  return { list, page, count };
}

// 내 폴더 목록 요청
export async function getMyFolders() {
  console.log('getMyFolders 함수 호출!');

  const res = await fetch(FOLDER + '/my', {
    headers: requestTokenHeader,
  });
  const folders = await res.json();
  return await folders.map((f) => f.folder);
}

// 사이트 목록 요청
export async function getSites(id) {
  console.log('getSites 함수 호출!');

  const res = await fetch(`${SITE}?folderId=${id}`, {
    headers: requestTokenHeader,
  });
  return await res.json();
}

// 사이트 추가
export async function addSite(folderId, title, url, comment) {
  const res = await fetch(SITE, {
    method: 'POST',
    headers: requestTokenHeader,
    body: JSON.stringify({
      folderId: folderId,
      siteName: title,
      url: url,
      comment: comment,
    }),
  });

  if (res.status === 200) {
    alert('성공적으로 등록되었습니다!');
  } else if (res.status === 400) {
    alert('입력 값을 다시 한번 확인해주십시오!');
  } else {
    alert('등록에 실패했습니다. markeepMG@gmail.com으로 문의주세요');
  }
}

// 프로필 조회
export async function getProfile() {
  const res = await fetch(USER + '/profile', {
    headers: requestTokenHeader,
  });
  return await res.json();
}

/*
요청 모음




9. nav>SearchFolder.js
목적: 왼쪽 바에서 첫번째 검색 기능임 / 검색하면 검색 단어가 포함된 폴더의 리스트 or 폴더를 찾아서 반환해주는 요청
const fetchMyFolderList = async () => {
    const res = await fetch(
      requestUri +
        '?page=' +
        `${pageNo}` +
        '&size=' +
        `${size}` +
        `&keyword=` +
        `${searchInput}`,
      {
        headers: { Authorization: 'Bearer ' + token },
      }
    );

    const { list } = await res.json();
    console.log('data: ', list);
    // list.map(())
    setList(list);
  };
10. nav>UserInfo.js
목적: 유저 팔로 정보 COUNT해서 가져오기
const followCount = async () => {
    cosnt getRes = await fetch()
  }; 
아직 미작성 하는중임

12. pages>Detail.js
목적: 폴더 번호 넘기면 그 폴더의 사이트 리스트를 반환한 것을 표현하는 페이지여서 사이트 리스트 요청
const fetchMySiteList = async () => {
    const res = await fetch(requestUri + '?folderId=' + id, {
      headers: { Authorization: 'Bearer ' + token },
    });
    console.log(res);

    const list = await res.json();
    console.log('lists: ', list);
    // list.map(())
    setSites(list);
  };
13. pages>Search.js
목적: 어,, 헤더검색창에서,,,인건가? 싶은데 아무내용이 안써져있음 이거 안쓰나
const fetchFolderList = async () => {
    const res = await fetch(
      requestUri +
        '/all?page=' +
        `${pageNo}` +
        '&size=' +
        `${size}` +
        '&keyword=' +
        `${keyword}`
    );

    const { list } = await res.json();
    // 응답데이터에 핀 수 추가 요망.
    console.log('list: ', list);

    setList(list);
  };
14. pages>SearchDetail.js
목적: 사이트 목록 조회 요청 / 이거 모달창에서 사이트 일자로 목록 주르륵 뜨는거 표현할 요청인듯
const fetchMySiteList = async () => {
    const res = await fetch(requestUri + '?folderId=' + folderId, {
      headers: { Authorization: 'Bearer ' + token },
    });
    console.log(res);

    const list = await res.json();
    console.log('lists: ', list);
    // list.map(())
    setSites(list);
  };
15. utils>AuthContext.js
목적: 토큰 값이 유효한지 서버에 찔러보는 함수
const testFunction = async () => {
      // console.log(
      //   'AuthContext useEffect token: ',
      //   localStorage.getItem('ACCESS_TOKEN')
      // );
      const requestHeader = {
        'content-type': 'application/json',
        // JWT에 대한 인증 토큰이라는 타입을 선언
        Authorization: 'Bearer ' + localStorage.getItem('ACCESS_TOKEN'),
      };
      const res = await fetch(API_BASE_URL + USER + '/status', {
        method: 'GET',
        headers: requestHeader,
      });
      console.log('status: ', res.status);
      if (res.status === 400) {
        console.log('토큰값 유효하지 않음!');
        alert('다시 로그인 해주세요!');
        localStorage.clear();
        setLoading(false);
        setIsLoggedIn(false);
      }
    };
============================================================
목적: 이게 AuthContext에 써놓고 getFolders()로 다른 컴포넌트에서 쓰려고 한 폴더리스트 요청임
const UsersGetFolderList = async () => {
    console.log('AuthContext 요청 들어옴!');
    const requestUriFolder = API_BASE_URL + FOLDER;
    const res = await fetch(requestUriFolder + '/my', {
      headers: { Authorization: 'Bearer ' + token },
    });
    const data = await res.json();
    return { data };
  };


*/
