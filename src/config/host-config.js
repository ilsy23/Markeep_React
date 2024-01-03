// 브라우저에서 현재 클라이언트의 호스트 이름 얻어오기
const clientHostName = window.location.hostname;
let backEndHostName; // 백엔드 서버 호스트 이름

if (clientHostName === "localhost") {
  // 개발 중
  backEndHostName = "http://localhost:8181";
} else if (
  clientHostName ===
  "http://markeep-react-bucket.s3-website.ap-northeast-2.amazonaws.com"
) {
  // 배포해서 서비스 중
  backEndHostName = "http://localhost:8181";
}

export const API_BASE_URL = backEndHostName;
export const USER = API_BASE_URL + "/user";
export const FOLDER = API_BASE_URL + "/folders";
export const SITE = API_BASE_URL + "/site";
export const FOLLOW = API_BASE_URL + "/follow";
