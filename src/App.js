import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import Community from './pages/Community';
import MyPage from './pages/MyPage';
import Search from './pages/Search';
import Detail from './pages/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Nav />
        <main>
          <Switch>
            <Route
              exact
              path='/'
            >
              <Community />
            </Route>
            <Route path='/my'>
              <MyPage />
            </Route>
            <Route path='/search'>
              <Search />
            </Route>
            <Route path='/detail'>
              <Detail />
            </Route>
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
