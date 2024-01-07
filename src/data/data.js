export function folders() {
  const folderList = [];
  for (let i = 0; i < 100; i++) {
    const userId = Math.floor(Math.random() * 11);

    folderList.push({
      id: i,
      title: `폴더 제목 ${i}`,
      userId: userId,
      nickname: `유저 ${userId}`,
      folderImg:
        'https://i.pinimg.com/236x/d2/67/23/d26723d20509e1de5ece9657149b35e8.jpg',
      profileImage:
        'https://i.pinimg.com/236x/46/d3/94/46d3941ee4bfbb8e15558ef350be56aa.jpg',
      hideFlag: Math.floor(Math.random() * 2),
      followFlag: Math.floor(Math.random() * 2),
      pinCount: 0,
    });
  }
  return folderList;
}

export function sites(folderId) {
  const siteList = [];
  for (let i = 0; i < 50; i++) {
    siteList.push({
      id: i,
      siteName: `사이트 제목 ${i}`,
      url: 'https://www.markeep.site',
      comment:
        '이 사이트는 영국에서 최초로 시작되어 일년에 한바퀴를 돌면서 받는 사람에게 행운을 주었고 지금은 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다.',
    });
  }
  return siteList;
}
