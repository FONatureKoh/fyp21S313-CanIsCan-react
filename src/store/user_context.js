import { useState, createContext } from "react";

// Creating the useContext
export const UserContext = createContext(null);

// Default export so that we can name the function as we import
export default ({ children }) => {
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');

  // Creating the userStore JSON so that we can use the function and
  // also the corresponding setFunction easily
  const userStore = {
    username: [userName, setUserName],
    usertype: [userType, setUserType]
  };

  return <UserContext.Provider value={userStore}>
    {children}
  </UserContext.Provider>
}

/********************************************************************************
 * Using of useContext                                                          *
 ********************************************************************************
 * The entiire useContext has been encapsulated in a JSON style object format.
 * To use say for example the username variable, you would do the follow:
 * ------------------------------------------------------------------------------
 * const testContext = useContext(UserContext);
 * testContext.username[0]; <- will return the username that is set.
 * ------------------------------------------------------------------------------
 * Using the corresponding function would be testContext.username[1]
 */

