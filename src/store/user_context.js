import React from "react";

// Creating the useContext
export const UserContext = React.createContext(null);

export default ({ children }) => {
  const [userName, setUserName] = React.useState();
  const [userType, setUserType] = React.useState();

  const userStore = {
    username: [userName, setUserName],
    usertype: [userType, setUserType]
  };

  return <UserContext.Provider value={userStore}>
    {children}
  </UserContext.Provider>
}

