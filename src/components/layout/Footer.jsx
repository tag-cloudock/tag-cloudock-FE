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
    color:#c8c8c8;
    font-size: 13px;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
`;

const GotoGithub = styled.span`
`;


const Insta = styled.a`
display: block;
    color:#6093FF;
    margin-bottom: 20px;
    font-size: 15px;
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
            <Insta href="https://www.instagram.com/baram_official_/">@baram_official</Insta>
                © C<CouncilSignIn><Link to={"/council/signin"}>o</Link></CouncilSignIn>pyright <GotoGithub >Eggis0</GotoGithub> All Rights Reserved 
            </FooterText>
        </FooterBox>
    );
};

export default Footer;