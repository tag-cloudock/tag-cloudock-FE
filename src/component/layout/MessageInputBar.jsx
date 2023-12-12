import styled from "styled-components";

const MessageInputBox = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 0; 
    right: 0;
    height: 75px;
    background: #ffffff;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 0px 24px;
  }
  @media screen and (min-width: 1001px) {
    flex-direction: column;
    position: fixed;
    top:50px;
    float:left;
    margin-left: -100px;
    margin-top: 50px;
    width: 75px;
    height: 500px;
    background: #ffffff;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 0px 24px;
  }

`;

const InputBox = styled.input`
    margin: 10px;
    width: 85%;
    height: 40px;
    background: #eeeeee;
    border: none;
    border-radius: 20px;
    color:#333333;
    padding: 0px 20px;
    font-size: 18px;
    outline: none;
    &::placeholder {
        color: #aaaaaa; 
    /* font-style: italic;  */
        font-size: 18px;
    }
`;

const SendBtn = styled.button`
   margin: 10px 10px 0px 0px;
   height: 40px;
   background: none;
   border: none;
   & img{
     width: 30px;
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


const MessageInputBar = () => {
    return (
        <MessageInputBox>
            <InputBox placeholder="메세지 보내기"></InputBox>
            <SendBtn>
                <img src="/image/send.png" alt="" />    
            </SendBtn>
        </MessageInputBox>
    );
  };

export default MessageInputBar;