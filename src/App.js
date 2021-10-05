import Login from './login/login';
import GeneralManager from './restaurant/GeneralManager/generalmanager';
import Profile from './profile/view-profile/profile';
import CustRegister from './register/custreg';
import RestRegister from './register/restreg';
import RestoProfile from './restaurant/restaurantprofile/restaurantprofile';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component= {Login} />
      <Route exact path="/profile" component= {Profile} />
      <Route exact path="/custreg" component= {CustRegister} />
      <Route exact path="/restreg" component= {RestRegister} />
      <Route path="/generalmanager" component= {GeneralManager} />
      <Route exact path="/restaurantprofile" component= {RestoProfile} />
    </Switch>
  );
}

export default App;
