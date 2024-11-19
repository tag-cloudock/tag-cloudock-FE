import styled from "styled-components";
import { useCookies } from "react-cookie";
import axios from "axios";

const Container = styled.div`
  display: flex;
  padding: 14px 22px 0 0 ;
  position: absolute; top: 100px; right: 0;
`;
const Title =styled.div`
  color: #bcbcbc;
  font-size: 16px;
  font-weight: bold;
  margin-right: 8px;
  cursor: pointer;
`;

const MoreImg=styled.img`
  width: 20px;
`;

const StockTitle = ({stockCode, setKey}) => {
  const [cookies] = useCookies(["token"]);
  const handleDelete = async () => {
    try {
      // DELETE 요청을 보냄
      const response = await axios.delete(`${process.env.REACT_APP_BACK_URL}/stock/${stockCode}`, {
        headers: {
          Authorization: `Bearer ${cookies.token}`, // Authorization 헤더에 토큰을 포함시킴
        },
      });
      setKey(stockCode+"delete");
      console.log("삭제 성공:", response.data);

      // 삭제 후 필요한 추가 작업을 여기에 작성하세요 (예: 리스트에서 해당 종목 삭제)
    } catch (error) {
      console.error("삭제 중 오류 발생", error);
      // 오류 처리 로직을 추가하세요
      alert("삭제에 실패했습니다.");
    }
  };

    return (
        <div>
            <Container>
                <Title onClick={handleDelete}>삭제하기</Title>
            </Container>
        </div>
    )
}
export default StockTitle