import Header from "../layout/Header";
import MenuBar from "../layout/MenuBar";
import { useCookies } from "react-cookie";

const User = () => {
    const [cookies] = useCookies(["nickname"]);
    return (
      <div>
        <Header headerType={"normal"} headerText={cookies.nickname}></Header>
        유저페이지
        <MenuBar></MenuBar>
      </div>
    );
  };

export default User;