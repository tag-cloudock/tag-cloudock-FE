import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import styled from "styled-components";
import Header from "../../components/layout/Header";

const AdminBox = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 700px;
  background: #ffffff;
`;

const ContentBox = styled.div`
  padding: 0px 20px;
`;

const InfoBox = styled.div`
  & div {
    margin-bottom: 10px;
  }

  font-size: 16px;
  font-weight: 500;
  color: #000000;
  background: #ffffff;

  & div > span {
    font-size: 16px;
    font-weight: 500;
    color: #828282;
    margin-bottom: 5px;
    display: inline-block;
  }
`;

const CreateCouncil = styled.div`
  width: 100%;
  height: 36px;
  line-height: 36px;
  overflow: hidden;
  font-size: 16px;
  font-weight: 500;
  color: #828282;

  text-align: center;
  border-radius: 50px;
  background: #eeeeeeca;
`;
const CreateCouncilBox = styled.div`
margin-top: 30px;
  margin-bottom: 100px;
  height: 100px;
`;


const Items = styled.ul`
  background: #ffffff;
  border-top: 1px solid #eeeeee;
  margin-top: 50px;
  padding-top: 30px;
  & li:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }
`;

const Item = styled.li`
  list-style: none;
  padding: 15px 0px;
  font-weight: 500;
  color: #000000;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

const ItemRemoveBtn = styled.button`
  float: right;
  border: none;
  background: none;
  margin-top: 5px;
  margin-left: 15px;
`;

const CountBox = styled.div`
  display: flex;
  align-items: center;

`;

const ChangeByOneBtn = styled.div`
  width: 20px;
  height: 20px;
  /* font-size: 10px; */
  font-weight: 500;
  background: #eeeeee;
  color: #bcbcbc;
  border-radius: 100px;
`;


const CountChangeBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  & img {
    width: 20px;
  }
`;

const Count = styled.input`
  font-size: 15px;
  border-radius: 30px;
  padding: 5px 15px;
  margin: 0px 5px;
  border: 1px solid #cccccc;
  width: 60px;
  text-align: center;
  /* margin: 0 5px; */
`;

const Subtitle = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  & span {
    display: block;
    float: right;
    border-radius: 100px;
    padding: 5px 15px;
    background: #6093FF;
    font-size: 10px;
    color: #ffffff;
  }
`;

const Tag = styled.span`
  border-radius: 10px;
  color: #6093FF;
  font-size: 16px;
  font-weight: 700;
  margin-right: 10px;
`;

const CouncilManagement = () => {
  const [councilData, setCouncilData] = useState({ items: [] });
  const [cookies] = useCookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies.token) {
      navigate("/signin");
      return;
    }
    if (cookies.roles !== "MANAGER") {
      navigate("/");
      return;
    }
    const fetchCouncils = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_BACK_URL + "/manage/council",
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );

        if (response.data.code !== 200) {
          navigate("/council/signin");
        }
        setCouncilData(response.data.data);
      } catch (error) {
        console.error("오류 발생:", error);
      }
    };

    fetchCouncils();
  }, [cookies.token, navigate]);

  const removeItem = async (id) => {
    if (window.confirm("이 아이템을 삭제하시겠습니까?")) {

    try {
      const response = await axios.delete(
        process.env.REACT_APP_BACK_URL + "/council-item/" + id,
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      window.alert("삭제되었습니다.");
      // Fetch updated data or update state to reflect removal
      setCouncilData((prevState) => ({
        ...prevState,
        items: prevState.items.filter((item) => item.itemId !== id),
      }));
    } catch (error) {
      console.error("오류 발생:", error);
    }
}
  };

  const handleQuantityChange = async (id, quantity) => {
    try {
      if (quantity < 0) return;
      const response = await axios.put(
        process.env.REACT_APP_BACK_URL + "/council-item/" + id,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      // Update state with new quantity
      setCouncilData((prevState) => ({
        ...prevState,
        items: prevState.items.map((item) =>
          item.itemId === id ? { ...item, quantity } : item
        ),
      }));
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const handleInputChange = (id, event) => {
    const newValue = Number(event.target.value);
    handleQuantityChange(id, newValue);
  };

  const handleIncrement = (id, currentQuantity) => {
    handleQuantityChange(id, currentQuantity + 1);
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(id, currentQuantity - 1);
    }
  };

  return (
    <AdminBox>
      <Header headerType={"manage"} headerText={councilData.name+" 관리자 페이지"}></Header>
      <ContentBox>
        <Subtitle>
          <Link to={"/council/manage/info"}>
            <span>수정하기</span>
          </Link>
        </Subtitle>
        <InfoBox>
          <div>
            <span>위치</span>{" "}
            <div>{councilData.location}</div>
          </div>
          <div>
            <span>운영시간</span>{" "}
            <div>
              {councilData.operatingHours}
              <br />
            </div>
          </div>
          <div>
            <span>이용수칙</span>{" "}
            <div>{councilData.usageGuidelines}</div>
          </div>
        </InfoBox>
        <Items>
          {councilData.items.map((item) => (
            <Item key={item.itemId}>
              <Left>
                <Tag>
                  {item.type === "RENTAL" ? "대여" : "제공"}
                </Tag>
                {item.name}
              </Left>

              <Right>
                <CountBox>
                  <CountChangeBtn onClick={() => handleDecrement(item.itemId, item.quantity)}>
                  <ChangeByOneBtn>-</ChangeByOneBtn>
                  </CountChangeBtn>
                  <Count
                    type="number"
                    min="0"
                    step="1"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(item.itemId, e)}
                  />
                  <CountChangeBtn onClick={() => handleIncrement(item.itemId, item.quantity)}>
                  <ChangeByOneBtn>+</ChangeByOneBtn>
                  </CountChangeBtn>
                </CountBox>
                <ItemRemoveBtn onClick={() => removeItem(item.itemId)}>
                  <img src={"/image/cancle-gray.svg"} alt="Remove" />
                </ItemRemoveBtn>
              </Right>
            </Item>
          ))}
        </Items>
        <CreateCouncilBox>
        <Link to={"/council/manage/item"}>
          <CreateCouncil>
            추가하기
          </CreateCouncil>
        </Link>
        </CreateCouncilBox>

      </ContentBox>
    </AdminBox>
  );
};

export default CouncilManagement;
