import styled from "styled-components";

const DateList = styled.div`
    padding-bottom: 50px;
    display: flex;
`;

/* button인지 div인지 몰겟엉. . */
const DateItem = styled.button`
  width: 70px;
  height: 30px;
  background:#e5e5e5;
  border-radius: 10px;
  color: #828282;
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  margin: 10px 0 0 15px;
  border: none;
`;

const Dates = () => {
    return (
        <div>
            <DateList>
                <DateItem>1일</DateItem>
                <DateItem>1주</DateItem>
                <DateItem>3달</DateItem>
                <DateItem>1년</DateItem>
            </DateList>
        </div>
    )
}

export default Dates
