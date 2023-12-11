import Header from "../layout/Header";
import MenuBar from "../layout/MenuBar";

const User = () => {
    return (
      <div>
        <Header headerType={"normal"} headerText={"마이페이지"}></Header>
        <MenuBar></MenuBar>
      </div>
    );
  };

export default User;