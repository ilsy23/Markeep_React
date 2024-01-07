import { Outlet } from 'react-router-dom';
import './App.scss';
import { Nav } from 'reactstrap';
import Header from './Header';

function App() {
  return (
    <div className='app'>
      <div className='nav'>
        <Nav />
      </div>
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
