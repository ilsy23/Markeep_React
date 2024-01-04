import { FOLDER, SITE, USER, FOLLOW } from '../config/host-config';

const token = localStorage.getItem('ACCESS_TOKEN');
const requestTokenHeader = {
  'content-type': 'application/json',
  Authorization: 'Bearer ' + token,
};
const requestHeader = {
  'content-type': 'application/json',
};

export const follow = async (userId) => {
  const res = await fetch(FOLLOW + `?toId=` + userId, {
    method: 'POST',
    headers: requestTokenHeader,
  });

  if (res.status === 200) {
  }
};
