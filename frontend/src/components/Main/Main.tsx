import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Rooms from "../Rooms/Rooms";
import Users from "../Users/Users";
import Friends from "../Friends/Friends";

const Main = () => {
	const navigate = useNavigate();

  const [selectedComponent, setSelectedComponent] = useState("Rooms");

  // Function to handle button click and set the selected component
  const handleButtonClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  // Render the selected component based on the state
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "Rooms":
        return <Rooms />;
      case "Users":
        return <Users />;
      case "Friends":
        return <Friends />;
      default:
        return <Rooms />; // Render nothing if no component is selected
    }
  };

  const handleLogout = () => {
	// Remove the "tokenId" cookie (or replace it with the name of your cookie)
	Cookies.remove("tokenId");
  
	// Use navigate to send the user to the "/" page
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
