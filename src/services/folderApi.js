import { FOLDER, SITE, USER } from "../config/host-config";

const token = localStorage.getItem("ACCESS_TOKEN");
const requestTokenHeader = {
  "content-type": "application/json",
  Authorization: "Bearer " + token,
};
const requestHeader = {
  "content-type": "application/json",
};

// 폴더 목록 요청
export async function getFolders(pageNo, size, keyword) {
  console.log("getFolders 함수 호출");

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
  console.log("getMyFolders 함수 호출!");
  const res = await fetch(`${FOLDER}/my`, {
    headers: requestTokenHeader,
  });
  const folders = await res.json();
  return await folders.map((f) => f.folder);
}

// 내 폴더 검색 요청
export async function searchMyFolders(keyword) {
  console.log("searchMyFolders 요청 들어옴!");
  const res = await fetch(
    `${FOLDER}/my/search?page=1&size=1&keyword=${keyword}`,
    {
      headers: requestTokenHeader,
    }
  );
  const folders = await res.json();
  return await folders.list;
}

// 사이트 목록 요청
export async function getSites(id) {
  console.log("getSites 함수 호출!");

  const res = await fetch(`${SITE}?folderId=${id}`, {
    headers: requestTokenHeader,
  });
  return await res.json();
}

// 북마크 추가
export async function addSite(folderId, title, url, comment) {
  console.log("addSite 함수 호출!");
  return await fetch(SITE, {
    method: "POST",
    headers: requestTokenHeader,
    body: JSON.stringify({
      folderId: folderId,
      siteName: title,
      url: url,
      comment: comment,
    }),
  });
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
