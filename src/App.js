import { BrowserRouter, Route, Routes  } from "react-router-dom";
import styled from "styled-components";
import Home from "./component/page/Home";
import User from "./component/page/User";
import Post from "./component/page/Post";
import PostDetail from "./component/page/PostDetail";
import Council from "./component/page/Council";
import CouncilDetail from "./component/page/CouncilDetail";
import SignIn from "./component/page/SignIn";
import SignUp from "./component/page/SignUp";
import Chat from "./component/page/Chat";
import InChat from "./component/page/InChat";
const MainLayout = styled.div`
  min-height: 2000px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

`;
function App() {
  return ( 
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/user" Component={User} />
          <Route path="/post" Component={Post} />
          <Route path="/post/:id" component={PostDetail} />
          <Route path="/council" Component={Council} />
          <Route path="/council/:id" Component={CouncilDetail} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/chat" Component={Chat} />
          <Route path="/chat/:id" Component={InChat} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}
export default App;

