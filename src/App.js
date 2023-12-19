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
import Admin from "./component/page/Admin";
import Write from "./component/page/Write";

const MainLayout = styled.div`
`;

function App() {
  return ( 
    <MainLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/admin" Component={Admin} />
          <Route path="/user/:userid" Component={User} />
          <Route path="/write" Component={Write} />
          <Route path="/post" Component={Post} />
          <Route path="/post/:id" component={PostDetail} />
          <Route path="/council" Component={Council} />
          <Route path="/council/:id" Component={CouncilDetail} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/signup" Component={SignUp} />
          <Route path="/chat" Component={Chat} />
          <Route path="/chat/:metype/:id/:other" Component={InChat} />
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}
export default App;

