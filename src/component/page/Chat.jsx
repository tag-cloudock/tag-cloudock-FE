import styled from "styled-components";
import Header from "../layout/Header";
import MenuBar from "../layout/MenuBar";
// const ContentBox = styled.div`
//   margin-top:60px;
//   width : 860px;
//   & h1{
//     height: 30px;
//     font-size : 70px;
//     font-weight: bold;
//     color : rgba(175, 218, 160, 1);
//     margin-bottom:100px;
//   }
// `;

const Chat = () => {
    return (
        <div>
          <Header headerType={"normal"} headerText={"채팅"}></Header>
          <MenuBar></MenuBar>
        </div>
    );
  };

export default Chat;