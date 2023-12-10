import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FriendRquested from "./FriendRquested";
import FriendsList from "./FriendsList";

const Friends = () => {
  const [selectedComponent, setSelectedComponent] = useState("FriendRequest");

  const handleButtonClick = (componentName: string) => {
    setSelectedComponent(componentName);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case "FriendRequest":
        return <FriendRquested />;
      case "Friends":
        return <FriendsList />;
      default:
        return <FriendRquested />;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => handleButtonClick("FriendRequest")}>
          수신함
        </button>
        <button onClick={() => handleButtonClick("Friends")}>목록</button>
      </div>
      {renderSelectedComponent()}
    </div>
  );
};

export default Friends;