import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/UserPages/Home";
import HomeNews from "./pages/UserPages/HomeNews";
import LoginPage from "./pages/UserPages/LoginPage";
import SocialKakao from "./pages/UserPages/SocialKakao";
const MainLayout = styled.div`
  height: 100%;
`;

function App() {
  return (
    <MainLayout>
      <BrowserRouter>
        <Routes>
          {/* 유저 */}
          <Route path="/" Component={Home} />
            <Route path="/login" Component={LoginPage}/>
            <Route path="/oauth/kakao" Component={SocialKakao} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}
export default App;

