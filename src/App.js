import { Outlet } from 'react-router-dom';
import Nav from './layouts/Nav';
import Header from './layouts/Header';

function App() {
  return (
    <div className='app'>
      <div className='nav'>
        <Nav />
      </div>
      <div className='nav-modal'></div>
      <div className='main-wrapper'>
        <div className='header'>
          <Header />
        </div>
        <div className='content-wrapper'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
