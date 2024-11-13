import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/UserPages/Home";

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
          {/*<Route path="/councils/:id" Component={CouncilDetail} /> */}
          {/* <Route path="/certification" Component={Certification} /> 
          <Route path="/user/:userid" Component={User} />
          <Route path="/write" Component={PostEdit} />
          <Route path="/posts" Component={PostList} />
          <Route path="/posts/:id" Component={PostDetail} /> 
          <Route path="/councils" Component={CouncilList} />
          <Route path="/councils/:id" Component={CouncilDetail} /> 
          <Route path="/signin" Component={KSignIn} />
          <Route path="/oauth/kakao" Component={SocialKakao} />
          <Route path="/privacy" Component={Privacy} />
          <Route path="/gachonherald" Component={GachonHerald} /> */}
          
          {/* <Route path="/signup" Component={SignUp} /> */}
          {/* <Route path="/chat" Component={ChatRoomList} />
          <Route path="/chat/:metype/:id/:interlocutorId/:post" Component={Chat} />
          <Route path="/notice" Component={NoticeList} />
          <Route path="/notice/:id" Component={NoticeDetail} />
          <Route path="/menual" Component={Manual} /> */}

        {/*  /!* 어드민 *!/*/}
        {/*  <Route path="/admin" Component={AdminManagement} />*/}
        {/*  <Route path="/admin/cimanage" Component={AdminCouncilManagement} />/!* admin/manage/council *!/*/}
        {/*  <Route path="/admin/cimanage/create" Component={AdminCouncilCreation} />/!* admin/manage/council/create *!/*/}
        {/*  <Route path="/admin/cimanage/add/:id" Component={AdminCouncilItemManagement} /> /!* admin/manage/council/items *!/*/}
        {/*  <Route path="/admin/certimanage" Component={AdminCertificationManagement} /> /!* admin/manage/certification *!/*/}
        {/*  <Route path="/admin/certimanage/:id" Component={AdminCertificationManagementDetail} /> */}
        {/*  <Route path="/admin/anno-manage" Component={AdminAnnoManagement} />*/}
        {/*  <Route path="/admin/anno-manage/create" Component={AdminAnnoCreation} />*/}

        {/*  /!* 학생회 *!/*/}
        {/*  <Route path="/council/signin" Component={CouncilSignIn} />*/}
        {/*  <Route path="/council/forgot" Component={ForgotPw} />*/}
        {/*  <Route path="/council/manage" Component={CouncilManagement} />*/}
        {/*  <Route path="/council/manage/info" Component={EditCouncilInfo} />/!* /council/manage/edit *!/*/}
        {/*  <Route path="/council/manage/item" Component={CreationCouncilItem} />/!* /council/manage/add *!/*/}
        </Routes>
      </BrowserRouter>
    </MainLayout>
  );
}
export default App;

