import Login from './login/login';
import GMmenu from './restaurant/landingpage/generalmanager'
//import Login from './profile/view-profile/profile';
//import Login from './profile/edit-profile/editprofile';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/gmmenu" component={GMmenu} />
    </Switch>
  );
}

export default App;
