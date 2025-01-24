import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const App = () => {
  const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/auth/getuser", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { success: false, message: "Not authenticated" };
    }
  };

  const {
    data: userdata,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userdata"],
    queryFn: fetchUserData,
    staleTime: 300000, // 5 minutes
    cacheTime: 3600000, // 1 hour
    retry: false,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <Navbar userdata={userdata} />
      <Routes>
        <Route
          path="/"
          element={userdata?.success ? <Navigate to="/home" /> : <Landing />}
        />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;
