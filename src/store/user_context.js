import { useState, createContext, useEffect} from "react";
import { retrieveUserProfile } from '../profile/profile_controller'

// Async function to get the profile independently based on already created
// profile controller from profile folder
async function getUserInfo() {
  try {
    const userProfile = await retrieveUserProfile();
    return userProfile;
  }
  catch (error) {
    return error;
  }
}

// Creating the useContext
export const UserContext = createContext(null);

// Default export so that we can name the function as we import
export default ({ children }) => {
  // Use states for the user stuff
  const [userName, setUserName] = useState('');
  const [userType, setUserType] = useState('');
  const [userFullName, setUserFullName] = useState('');

  // User Profile retrieval
  
  useEffect(() => {
    getUserInfo()
      .then((response) => {
        // Set all the useful stuff into the 3 states
        setUserName(response.username);
        setUserType(response.user_type);
        setUserFullName(response.first_name + " " + response.last_name);

        console.log(response);
      })
      .catch(error => {
        console.log(error);
        console.log("user not logged in");
      })
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

