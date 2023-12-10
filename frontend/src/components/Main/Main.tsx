import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Rooms from "../Rooms/Rooms";
import Users from "../Users/Users";
import Friends from "../Friends/Friends";

const Main = () => {
	const navigate = useNavigate();

  const [selectedComponent, setSelectedComponent] = useState("Rooms");

  const handleButtonClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Rooms":
        return <Rooms />;
      case "Users":
        return <Users />;
      case "Friends":
        return <Friends />;
      default:
        return <Rooms />;
    }
  };

  const handleLogout = () => {
	Cookies.remove("tokenId");
  
	navigate("/");
  };

  return (
    <div>
      <h1>Main</h1>
      <div>
        <button onClick={() => handleButtonClick("Rooms")}>Rooms</button>
        <button onClick={() => handleButtonClick("Users")}>Users</button>
        <button onClick={() => handleButtonClick("Friends")}>Friends</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Main;
