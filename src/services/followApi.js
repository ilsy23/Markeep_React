import { FOLDER, SITE, USER, FOLLOW } from '../config/host-config';

const token = localStorage.getItem('ACCESS_TOKEN');
const requestTokenHeader = {
  'content-type': 'application/json',
  Authorization: 'Bearer ' + token,
};
const requestHeader = {
  'content-type': 'application/json',
};

export const follow = async (toId) => {
  const res = await fetch(FOLLOW + `?toId=` + toId, {
    method: 'POST',
    headers: requestTokenHeader,
  });

  if (res.status === 200) {
  }
};
