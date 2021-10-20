import { useState, createContext, useEffect} from "react";
import { retrieveUserProfile } from '../profile/profile_controller'

// Creating the useContext
export const UserContext = createContext(null);

// Default export so that we can name the function as we import
export default ({ children }) => {
  
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [userFullName, setUserFullName] = useState('');

  // User Profile retrieval
  useEffect(() => {
    async function getUserInfo() {
      const userProfile = await retrieveUserProfile();
      if (userProfile)
      {
        setUserFullName(userProfile.first_name + " " + userProfile.last_name)
      }
      else
      {
        //if user is not logged in, redirect to login
        //setUserFullName(userProfile.first_name + " " + userProfile.last_name)
        console.log("user not logged in")
      }
      console.log(userProfile)
    }
    getUserInfo();
  },[])
  // Creating the userStore JSON so that we can use the function and
  // also the corresponding setFunction easily
  const userStore = {
    username: [userName, setUserName],
    usertype: [userType, setUserType],
    userFullName: [userFullName, setUserFullName]
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

