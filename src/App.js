import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import NaverLogin from "./components/login/NaverLogin";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/oauth/naver" element={<NaverLogin />} />
      </Routes>
    </div>
  );
}

export default App;
