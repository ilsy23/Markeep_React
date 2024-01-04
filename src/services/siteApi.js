import { FOLDER, SITE, USER } from "../config/host-config";

const token = localStorage.getItem("ACCESS_TOKEN");
const requestTokenHeader = {
  "content-type": "application/json",
  Authorization: "Bearer " + token,
};
const requestHeader = {
  "content-type": "application/json",
};

// 사이트 목록 요청
export async function getSites(id) {
  console.log("getSites 함수 호출!");

  const res = await fetch(`${SITE}?folderId=${id}`, {
    headers: requestTokenHeader,
  });
  return await res.json();
}

// 사이트 삭제 요청
export async function deleteSite(folderId, siteId) {
  console.log("deleteSite 함수 호출!");

  return await fetch(SITE, {
    method: "DELETE",
    headers: requestTokenHeader,
    body: JSON.stringify({ folderId: folderId, siteId: siteId }),
  });
}

// 사이트 저장 요청
export async function updateSite(updateData) {
  console.log("updateSite 함수 호출!");

  return await fetch(`${SITE}`, {
    method: "PATCH",
    headers: requestTokenHeader,
    body: JSON.stringify(updateData),
  });
}
