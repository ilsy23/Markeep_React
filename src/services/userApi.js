import { FOLDER, SITE, USER } from "../config/host-config";

const token = localStorage.getItem("ACCESS_TOKEN");
const requestTokenHeader = {
  "content-type": "application/json",
  Authorization: "Bearer " + token,
};
const requestHeader = {
  "content-type": "application/json",
};

// 프로필 조회
export async function getProfile() {
  const res = await fetch(USER + "/profile", {
    headers: requestTokenHeader,
  });
  return await res.json();
}
