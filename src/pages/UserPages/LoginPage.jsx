import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #ffffff;
  height: 1000px;
  
`;

const LoginTitle = styled.div`
  color: #6093FF;
  font-weight: 800;
  font-size: 70px;
  margin-top: 300px;
  margin-bottom: 20px;
`;

const KakaoLogin = styled.img` 
  width: 350px;  // Adjust size of the Kakao login button as needed
  /* height: auto; */
`;

const LoginPage = () => {

    return (
        <LoginContainer>
            <LoginTitle>Cloudock</LoginTitle>
            <a href="https://kauth.kakao.com/oauth/authorize?client_id=4fca9f8288a8698a1ae6eb544616ba9f
&redirect_uri=http://127.0.0.1:3000/oauth/kakao
&response_type=code">
            <KakaoLogin src="/image/kakaologin.png" alt="Kakao Login"/>
            </a>

        </LoginContainer>
    );
};

export default LoginPage;
