import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterBox = styled.div`
    height: 5%;
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 1000px;
`;
const FooterText = styled.div`
    text-align: center;
    color:#cccccc;
    font-size: 15px;
    & a{
        color:#559BFF;
    }
    
`;


const Footer = () => {
    
    return (
        <FooterBox>
            <FooterText>
            © Copyright <a href="https://github.com/Eggis0">Eggis0</a> All Rights Reserved
            </FooterText>
        </FooterBox>

    );
    
    
};

export default Footer;