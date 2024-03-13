import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";

const AdminBox = styled.div`
    padding: 0 20px;
`;

const DashBoardDataLine = styled.li`
  list-style: none;
  display: flex;
  justify-content: space-between;
  margin: 15px 0px;
`;
const DashBoardDataName = styled.span`
    font-weight: bold;
    color:#555555;
`;
const DashBoardData = styled.span`
    color: #aaaaaa;
`;
const Subtitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
  color: #333333;
`;

const Dashboard = styled.div`
    background: #ffffff;
  border: 1px solid #38d9a9;
  border-radius: 10px;
  padding: 10px 20px;
`;
const RequestsBox = styled.ul`
    margin: 30px 0px;
    background: #ffffff;
    border-radius: 15px;
    box-shadow: rgba(215, 218, 220, 0.5) 0px 0px 15px;
    overflow: hidden;
    & a:not(:last-child) li{
        border-bottom: 1px solid #dddddd;
    }
`;

const UserImg = styled.div`
    width: 100%;
    border: 1px solid #eeeeee;
    float: left;
    margin-right: 10px;
    overflow: hidden;
    position: relative;
    & img{
    width: 100%;
    height: 100%;
   }
`;


const Council = styled.li`
    display: inline-block;
    width: calc(100% - 20px);
    list-style: none;
    padding: 15px 10px; 
    position: relative;
`;

const UserInfo = styled.div`
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    color: #4f4f4f;
    display: inline-block;
    & span{
        font-weight: 700;
        margin: 0px 10px;
    }
`;

const CertifiState = styled.div`
    position: absolute;
    top: 30px;
    right: 20px;
    & img{
        ${({ isCertifi }) => (isCertifi ? null : 'opacity: 30%')};
        width: 50px;
    }
`;

const ModalBtnBox = styled.div`
  width: 100%;
  bottom: 22px;
  display: flex;
  justify-content: space-between;
`;

const ModalBtn = styled.button`
 margin-top: 30px;
  border: none;
  width: 48%;
  background: ${({ isLeft }) => (isLeft ? '#c9c9c9' : '#38d9a9')};
  padding: 15px;
  text-align: center;
  border-radius: 15px;

  font-size: 15px;
  color:#FFFFFF;
`;
const AdminCertificationManagementDetail = () => {
    const [certiRequest, setCertificationRequest] = useState({user:{}, requestAt:[]}); // 채팅방 리스트 상태
    const [key, setKey] = useState(0);
    const [cookies] = useCookies(); // 쿠키 사용하기 위해
    const navigate = useNavigate(); // 페이지 이동 위해
    const { id } = useParams(); 


    useEffect(() => {
        if (!cookies.token) {
            navigate("/signin");
            return;
        }
        if (cookies.roles != "ADMIN") {
            navigate("/");
            return;
          
          }
        const fetchCertificationRequests = async () => {
            try {
                const response = await axios.get("https://" + process.env.REACT_APP_BACK_URL + "/certifi/requests/"+id, {
                    headers: {
                        Authorization: `Bearer ${cookies.token}`,
                    },
                });
                setCertificationRequest(response.data.data);
                // console.log(response.data);

            } catch (error) {
                console.error("오류 발생:", error);
            }
        };

        fetchCertificationRequests();
    }, [cookies.token, navigate, key]); // [] 와 같이 비워도 됨.
    const handleChange = async (e) => {
        e.preventDefault();
        
        const isCertification = true;
        try {
          const signUpResponse = await axios.put("https://" + process.env.REACT_APP_BACK_URL + "/certifi/approval/"+certiRequest.user.userId,
          {
            isCertification
          },
          {
              headers: {
                  Authorization: `Bearer ${cookies.token}`,
    
              },
          }
          );
            // 성공시
            if (signUpResponse.data.code === 200) {
                // setIsDoneModalOn(false);
                setKey(key+1);
            }
        } catch (error) {
            console.error("오류 발생:", error);
    
        }
    };
    

    return (
        <AdminBox>
            <Header headerType={"noChatIcon"} headerText={"학생증 인증 관리"}></Header>
            <RequestsBox>
            <Council key={certiRequest.certiId}>
                               
                                <UserInfo>
                                    <span>아이디</span>{certiRequest.user.userId}<br /> <span>닉네임</span>{certiRequest.user.nickName}<br />
                                    <span>이름</span>{certiRequest.name} <span>학번</span>{certiRequest.studentIdNumber}<br />
                                    <span>요청 시각</span>{certiRequest.requestAt}
                                </UserInfo>
                                <CertifiState isCertifi={certiRequest.user.certification}>
                                    <img src={"/image/check.svg"}></img>
                                </CertifiState>
                            </Council>
                            
            </RequestsBox>
            <UserImg >
                                    <img src={"https://" + process.env.REACT_APP_BACK_URL + "/image/" + certiRequest.imgPath}/>
                                </UserImg>

                               {certiRequest.user.certification ==false ?
                                <ModalBtnBox>

                            <ModalBtn  isLeft={true}>
                            거절
                            </ModalBtn>

                            <ModalBtn  onClick={handleChange}>
                            승인
                            </ModalBtn >
                            </ModalBtnBox>
                            : null}
                                    </AdminBox>
                                    
                                );
};

export default AdminCertificationManagementDetail;