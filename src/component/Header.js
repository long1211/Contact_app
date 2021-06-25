import React from "react";

const Header = () => {
  return (
    <div className="ui  menu" style={{position: "fixed",
      top: "0",
      left: "0",
      width: "100%", zIndex:"99"}}>
      <div className="ui container " style={{justifyContent: "center", padding:"1rem 0"}}>
        <h1>Contact Manager</h1>
      </div>
    </div>
  );
};

export default Header;