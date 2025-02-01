import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import { UserProvider, useUser } from "./context/UserContext";

const AppContent = () => {
  const { userdata, isPending, error } = useUser();

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
        <Route
          path="/home"
          element={userdata?.success ? <Home /> : <Navigate to="/" />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
