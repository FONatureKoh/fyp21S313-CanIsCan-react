import { useState, createContext } from "react";

// Creating the useContext
export const UserContext = createContext(null);

export default ({ children }) => {
  const [userName, setUserName] = useState();
  const [userType, setUserType] = useState();

  const userStore = {
    username: [userName, setUserName],
    usertype: [userType, setUserType]
  };

  return <UserContext.Provider value={userStore}>
    {children}
  </UserContext.Provider>
}

