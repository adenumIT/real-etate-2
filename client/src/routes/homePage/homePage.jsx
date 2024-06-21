import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const HomePage = () => {
  const {currentUser}=useContext(AuthContext)
  console.log(currentUser)
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate & Get Your Dream Place </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae
            eaque aliquid corrupti accusamus, enim nesciunt molestias eligendi
            expedita consequatur eum dolore voluptate provident, assumenda nisi
            dolor reiciendis qui ad. A!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>2000</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>1200</h1>
              <h2>Property ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="image" />
      </div>
    </div>
  );
};

export default HomePage;
