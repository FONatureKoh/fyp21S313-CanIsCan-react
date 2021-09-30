//import Login from './login/login';
import Login from './restaurant/landingpage/generalmanager'
//import Login from './profile/view-profile/profile';
//import Login from './profile/edit-profile/editprofile';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
