import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
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

  return (
    <UserContext.Provider value={{ userdata, isPending, error, refetch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
