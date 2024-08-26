import { Link } from "react-router-dom";
import styled from "styled-components";

// 푸터 박스
const FooterBox = styled.div`

    height: 100px;
    width: 100%;
    background: #ffffff;
    /* position: absolute; */
    max-width: 701px;
`;

// 푸터 텍스트
const FooterText = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    color:#bcbcbc;
    font-size: 14px;
    font-weight: 300;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
`;

const GotoGithub = styled.span`
`;


const Insta = styled.a`
    text-align: center;
    color:#bcbcbc;
    font-size: 14px;
    font-weight: 300;
    margin-bottom: 10px;
`;


const CouncilSignIn = styled.span`
    & a{
        color:#bcbcbc;
    }
`;

const Info = styled.span`
display: block;
    color:#cccccc;
    font-size: 12px;
    margin-top: 5px;
    & a{
        color:#bcbcbc;
    }
`;

const Footer = () => {
    return (
        <FooterBox>
            <FooterText>
            <Insta href="https://www.instagram.com/baram_official_/">@baram_official_</Insta>
               <div><CouncilSignIn><Link to={"/council/signin"}>© </Link></CouncilSignIn>2024 Baram. All Rights Reserved
                </div>  
                {/* <Info>
                   <Link to={"/privacy"}>개인정보 처리방침</Link>  
                </Info> */}
            </FooterText>
            
        </FooterBox>
    );
};

export default Footer;