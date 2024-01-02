/*
용도: 푸터
담당자: 양태석
사용법: 로그인, 로그아웃에서 푸터로 사용
기타: 
*/
import { Link } from "react-router-dom";
import styled from "styled-components";

// 푸터 박스
const FooterBox = styled.div`
    height: 5%;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
`;

// 푸터 텍스트
const FooterText = styled.div`
    text-align: center;
    color:#cccccc;
    font-size: 15px;
`;

const GotoGithub = styled.a`
    color:#379DFF;
`;

const CouncilSignIn = styled.span`
    & a{
        color:#cccccc;
    }
`;


const Footer = () => {
    return (
        <FooterBox>
            <FooterText>
                © C<CouncilSignIn><Link to={"/council/signin"}>o</Link></CouncilSignIn>pyright <GotoGithub href="https://github.com/Eggis0">Eggis0</GotoGithub> All Rights Reserved
            </FooterText>
        </FooterBox>
    );
};

export default Footer;