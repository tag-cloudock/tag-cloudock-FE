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
    font-size: 15px;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
`;

const GotoGithub = styled.span`
`;


const Insta = styled.a`
    /* color:#6093FF; */
    display: block;
    /* margin-left: 10px; */
    margin-bottom: 12px;

    & img{
        width: 20px;
    }
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
            <Insta href="https://www.instagram.com/baram_official_/"><img src="/image/insta.svg"></img></Insta>
                <CouncilSignIn><Link to={"/council/signin"}>©</Link></CouncilSignIn> Copyright 나우 Ai Way All Rights Reserved 
                
            </FooterText>
        </FooterBox>
    );
};

export default Footer;