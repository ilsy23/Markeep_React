import { createBrowserRouter } from 'react-router-dom';
import App from '../components/layout/App';
import Community from '../pages/Community';
import MyPage from '../pages/MyPage';
import Search from '../pages/Search';
import KakaoLogin from '../components/sign/sns/KakaoLogin';
import NaverLogin from '../components/sign/sns/NaverLogin';
import Folder from '../components/folder/Folder';
import AddFolder from '../components/folder/AddFolder';
import MyFolder from '../components/folder/MyFolder';
import EditFolder from '../components/folder/EditFolder';
import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Community />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'folders/:id',
            element: <Folder />,
          },
          {
            path: 'folders/add',
            element: <AddFolder />,
          },
        ],
      },
      {
        path: 'mypage',
        element: <MyPage />,
        children: [
          {
            path: 'folders/:id',
            element: <MyFolder />,
          },
          {
            path: 'folders/:id/edit',
            element: <EditFolder />,
          },
        ],
      },
      {
        path: ':keyword',
        element: <Search />,
      },
      {
        path: 'oauth/redirected/kakao',
        element: <KakaoLogin />,
      },
      {
        path: 'oauth/naver',
        element: <NaverLogin />,
      },
    ],
  },
]);
