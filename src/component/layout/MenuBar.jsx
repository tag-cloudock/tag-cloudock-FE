import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const MenuBarBox = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
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
  @media screen and (min-width: 1001px) {
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
  @media screen and (max-width: 1000px) {
    width: 33%;;
    height: 100%;
    background: none;
    border: none;
  }
  @media screen and (min-width: 1001px) {
    height: 33%;;
    background: none;
    border: none;
  }
  & a{
    display: inline-block;
    margin: auto auto;
  }
`;


const MenuBar = () => {
    const location = useLocation();
    return (
        <MenuBarBox>
          <NavBtn>
            <Link to={"/"}>
              <img src={location.pathname === "/" ? "/image/home_nav_icon_on.png" : "/image/home_nav_icon.png"} alt="" />
            </Link>
          </NavBtn>
          <NavBtn>
            <Link to={"/write"}>
              <img src="/image/write_nav_icon.png" alt="" />
            </Link>
          </NavBtn>
          <NavBtn>
            <Link to={"/user"}>
              <img src={location.pathname === "/user" ? "/image/user_nav_icon_on.png" : "/image/user_nav_icon.png"} alt="" />
            </Link>
          </NavBtn>
        </MenuBarBox>
    );
  };

export default MenuBar;