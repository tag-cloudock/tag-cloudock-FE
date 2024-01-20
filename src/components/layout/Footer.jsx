import { Link } from "react-router-dom";
import styled from "styled-components";

// 푸터 박스
const FooterBox = styled.div`

    height: 300px;
    width: 100%;
    background: #ffffff;
    /* position: absolute; */
    max-width: 701px;
`;

// 푸터 텍스트
const FooterText = styled.div`
    text-align: center;
    color:#cccccc;
    font-size: 15px;
    position: absolute;
    bottom: 15px;
    left: 0;
    right: 0;
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