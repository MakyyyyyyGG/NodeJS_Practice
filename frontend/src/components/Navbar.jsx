import React from "react";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import { Button } from "./ui/button";

const Navbar = ({ userdata }) => {
  const isAuthenticated = userdata?.success && userdata?.user;

  console.log("User data:", userdata);

  const handleLogout = () => {
    window.open("http://localhost:5000/auth/logout", "_self");
  };

  if (!isAuthenticated) {
    return (
      <div>
        <ul>
          <li>
            <Signup />
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div>
      <img src={userdata.user.profile_picture} alt="" />
      <h1>Welcome {userdata.user.display_name}</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Button onClick={handleLogout}>Logout</Button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
