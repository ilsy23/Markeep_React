import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import NaverLogin from "./components/login/NaverLogin";
import { AuthContextProvider } from "./utils/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/oauth/naver" element={<NaverLogin />} />
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
