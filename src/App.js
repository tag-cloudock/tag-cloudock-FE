import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/UserPages/Home";
import HomeNews from "./pages/UserPages/HomeNews";
import LoginPage from "./pages/UserPages/LoginPage";
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
          <Route path="/news" Component={HomeNews} />
            <Route path="/login" Component={LoginPage}/>
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}
export default App;

