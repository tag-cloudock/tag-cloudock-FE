/*
용도: 관리자 페이지
담당자: 양태석
사용법: App.js에서 라우팅됨.
기타: ADMIN 권한 유저만 접근 가능
*/
import Dashboard from "../content/admin/DashBoard";

const Admin = () => {
    return (
        <div>
            <Dashboard></Dashboard>
        </div>
    );
  };

export default Admin;