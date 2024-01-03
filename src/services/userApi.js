import { FOLDER, SITE, USER } from '../config/host-config';

const token = localStorage.getItem('ACCESS_TOKEN');
const requestTokenHeader = {
  'content-type': 'application/json',
  Authorization: 'Bearer ' + token,
};
const requestHeader = {
  'content-type': 'application/json',
};

// 프로필 조회
export async function getProfile() {
  const res = await fetch(USER + '/profile', {
    headers: requestTokenHeader,
  });
  return await res.json();
}

// 프로필 사진 수정 요청
export const fetchUpdateProfile = async (file) => {
  const formData = new FormData();
  formData.append('profileImage', file);

  const res = await fetch(USER + '/profile', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
  });

  if (res.status === 200) {
    console.log('프로필 사진 변경 완료!: ');
    return await res.text();
  } else {
    console.error('프로필 사진 변경 실패');
  }
};

export const fetchPutNickname = async (newNickname) => {
  const res = await fetch(USER + '/nickname?nickname=' + newNickname, {
    method: 'PUT',
    headers: requestTokenHeader,
  });

  if (res.status === 200) {
    return await res;
  } else {
    console.error('닉네임 변경실패');
  }
};
