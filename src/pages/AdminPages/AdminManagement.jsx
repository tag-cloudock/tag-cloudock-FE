import styled from "styled-components";
import Header from "../../components/layout/Header";
import { Link } from "react-router-dom";

const AdminBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;

`;

const ContentBox = styled.div`
  padding: 0 20px;
`;

const Subtitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #000000;
`;

const DashBoardBox = styled.div`
  background: #ffffff;
  border: 1px solid #38d9a9;
  border-radius: 10px;
  padding: 10px 20px;
`;

const DashBoardDataLine = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
`;
const DashBoardDataName = styled.span`
    font-weight: bold;
    color:#000000;
`;
const DashBoardData = styled.span`
    color: #000000;
`;
const ManageBox = styled.div`
`;
const ManageBtn = styled.div`
  margin-bottom: 10px;
  height: 50px;
  width: 100%;
  border: 1px solid #38d9a9;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  font-weight: 600;
  color: #38d9a9;

  &:hover{
    color: #ffffff;
    background: #38d9a9;
  }

`;
const AdminManagement = () => {
    return (
        <AdminBox>
            <Header headerType={"onlyText"}></Header>
            <ContentBox>
                    <Subtitle>DASHBOARD</Subtitle>
                <DashBoardBox>
                    <ul>
                        <DashBoardDataLine>
                            <DashBoardDataName>회원 수</DashBoardDataName>
                            <DashBoardData>명</DashBoardData>
                        </DashBoardDataLine>
                        <DashBoardDataLine>
                            <DashBoardDataName>인중된 회원 수</DashBoardDataName>
                            <DashBoardData>명</DashBoardData>
                        </DashBoardDataLine>
                        <DashBoardDataLine>
                            <DashBoardDataName>게시물 수</DashBoardDataName>
                            <DashBoardData>개</DashBoardData>
                        </DashBoardDataLine>
                        <DashBoardDataLine>
                            <DashBoardDataName>완료된 게시물 수</DashBoardDataName>
                            <DashBoardData>개</DashBoardData>
                        </DashBoardDataLine>
                        <DashBoardDataLine>
                            <DashBoardDataName>후기 수</DashBoardDataName>
                            <DashBoardData>개</DashBoardData>
                        </DashBoardDataLine>
                    </ul>

                </DashBoardBox>
                <Subtitle>MANAGE</Subtitle>
                <ManageBox>
                    <Link to={"/admin/cimanage"}><ManageBtn>학생회 관리</ManageBtn></Link>
                    <Link to={"/admin/certimanage"}><ManageBtn>인증 관리</ManageBtn></Link>
                    <ManageBtn>악성 유저 관리</ManageBtn>
                    <Link to={"/admin/anno-manage"}><ManageBtn>공지사항 관리</ManageBtn></Link>
                </ManageBox>

            </ContentBox>
            
        </AdminBox>
    );
};

export default AdminManagement;