import React from "react";
import { Link } from "react-router-dom";
import Signup from "./Signup";
import { Button } from "./ui/button";

const Navbar = ({ userdata }) => {
  const isAuthenticated = userdata?.success && userdata?.user;

  console.log("User data:", userdata);

  /*************  ✨ Codeium Command ⭐  *************/
  /******  4a72ca35-888a-489e-8480-56591505b967  *******/
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
    <div className="flex border items-center p-4">
      <div className="flex items-center gap-4">
        <img
          src={userdata.user.profile_picture}
          alt=""
          className="rounded-full h-10 w-10"
        />
        {/* <p>Welcome {userdata.user.display_name}</p> */}
      </div>

      <ul className="flex gap-4 items-center ml-auto">
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
