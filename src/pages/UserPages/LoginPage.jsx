import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const LoginTitle = styled.div`
  color: #6093FF;
  font-weight: 800;
  font-size: 70px;
  margin-top: 150px;
  margin-bottom: 110px;
`;

const KakaoLogin = styled.img` 
  width: 300px;  // Adjust size of the Kakao login button as needed
  height: auto;
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
