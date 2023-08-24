import { FunctionComponent, useState } from "react";
import Navbar from "./Navbar";
import Products from "./Products";
import { userInfo } from "os";

interface HomeProps { }

const Home: FunctionComponent<HomeProps> = () => {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false, isAdmin: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  return (
    <>
      <h1>Home</h1>
      <Products userInfo={userInfo} />
    </>);
};

export default Home;
