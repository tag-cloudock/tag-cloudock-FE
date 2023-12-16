import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const MenuBarBox = styled.div`
  display: flex;
  background: #ffffff;
  @media screen and (max-width: 700px) {
    justify-content: space-between;
    position: fixed;
    margin: 0 auto;
    bottom: 20px;
    width: 80%;
    left: 0; 
    right: 0;
    border-radius: 30px 30px 30px 30px;
    height: 45px;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 0px 20px;
    & img{
      width: 30px;
    }
  }
  @media screen and (min-width: 701px) {
    flex-direction: column;
    position: fixed;
    top:50px;
    float:left;
    margin-left: -100px;
    margin-top: 50px;
    width: 65px;
    height: 500px;
    border-radius: 20px 20px 20px 20px;
    background: #ffffff;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 0px 24px;
  }

`;

const NavBtn = styled.div`
  display: flex;
  opacity: ${({ isOn }) => (isOn ? '100%' : '40%')};
  @media screen and (max-width: 700px) {
    width: 33%;;
    height: 100%;
    background: none;
    border: none;
  }
  @media screen and (min-width: 701px) {
    height: 33%;;
    background: none;
    border: none;
  }
  & a{
    display: inline-block;
    margin: auto auto;
  }
`;

const BigCircle = styled.div`
  opacity: 100%;
  width: 59px;
  height: 59px;
  margin-top: -7px;
  border-radius: 100px;
  background: #ffffff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 20px;
  position: relative;
`;

const SmallCircle = styled.div`
  margin: 0 auto;
  opacity: 100%;
  width: 49px;
  height: 49px;
  position: absolute;
  left: 5px;
  top: 5px;
  border-radius: 100px;
  background: #559BFF;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 0px 20px;
  & img{
    width: 49px;
  }
`;


const MenuBar = () => {
    const location = useLocation();
    return (
        <MenuBarBox>
          <NavBtn isOn={location.pathname === "/"}>
            <Link to={"/"}>
              <img src={"/image/home.svg"} alt="" />
            </Link>
          </NavBtn>
          <NavBtn isOn={true}>
            <Link to={"/write"}>
              <BigCircle>
                <SmallCircle>
                  <img src="/image/write.svg" alt="" />
                </SmallCircle>
              </BigCircle>
              
            </Link>
          </NavBtn>
          <NavBtn isOn={location.pathname === "/user"}>
            <Link to={"/user"}>
              <img src={"/image/user.svg"} alt="" />
            </Link>
          </NavBtn>
        </MenuBarBox>
    );
  };

export default MenuBar;