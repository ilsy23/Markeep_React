const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const STATE_STRING = process.env.REACT_APP_NAVER_STATE;
const CALLBACK_URL = process.env.REACT_APP_NAVER_REDIRECT_URI;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=${STATE_STRING}&redirect_uri=${CALLBACK_URL}`;
