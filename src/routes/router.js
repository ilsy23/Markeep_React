import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Community from '../pages/Community';
import MyPage from '../pages/MyPage';
import Folder from '../pages/Folder';
import EditFolder from '../pages/EditFolder';

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        index: true,
        element: <Community />,
      },
      {
        path: 'my-folders',
        element: <MyPage />,
        children: [
          {
            path: ':id',
            element: <Folder />,
          },
          {
            path: ':id/edit',
            element: <EditFolder />,
          },
        ],
      },
      {
        path: 'my-folders/:keyword',
        element: <MyPage />,
      },
    ],
  },
]);
