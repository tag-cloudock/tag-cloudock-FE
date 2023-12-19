/*
용도: 로딩 표시
담당자: 양태석
사용법: 로딩이 필요한곳에서 사용
기타: 
*/
import styled from "styled-components";

// 로딩
const Loding = styled.div`
  position: fixed;
  z-index: 1;
  top: 50%;
  width: 100%;
  @media screen and (min-width: 701px) {
    top: 40%;
    margin: 0px auto;
    width: 701px;
  }
  & img{
    width: 20%;
    display: block;
    margin: 0 auto;
    opacity: 50%;
  }
`;

const Loading = () => {
    return (
        <Loding>
            <img src={"/image/spinner.gif"} alt="a" width="60%"/>
        </Loding>
    );
  };

export default Loading;