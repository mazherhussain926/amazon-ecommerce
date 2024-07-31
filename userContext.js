//we will create context that we can use user at all points of our application
// for this purpoose we will use createContext hook from react
import { createContext, useState } from "react";
const UserType = createContext();
const UserContext = ({ children }) => {
  const [userId, setUserId] = useState("");
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};
export { UserType, UserContext };
