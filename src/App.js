import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import NaverLogin from './components/login/NaverLogin';
import { AuthContextProvider } from './utils/AuthContext';
import KakaoLogin from './components/login/KakaoLogin';

function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <Header />
        <Routes>
          <Route
            path='/oauth/naver'
            element={<NaverLogin />}
          />
          <Route
            path='/oauth/redirected/kakao'
            element={<KakaoLogin />}
          />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
