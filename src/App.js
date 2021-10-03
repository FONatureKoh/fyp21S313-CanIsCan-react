import Login from './login/login';
import GMmenu from './restaurant/landingpage/generalmanager'
import Profile from './profile/view-profile/profile';
import CustRegister from './register/custreg';
import RestRegister from './register/restreg';
import EditMenu from './restaurant/editmenu/EditMenu';
import RestoProfile from './restaurant/restaurantprofile/restaurantprofile';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component= {Login} />
      <Route exact path="/gmmenu" component= {GMmenu} />
      <Route exact path="/profile" component= {Profile} />
      <Route exact path="/custreg" component= {CustRegister} />
      <Route exact path="/restreg" component= {RestRegister} />
      <Route exact path="/editmenu" component= {EditMenu} />
      <Route exact path="/restaurantprofile" component= {RestoProfile} />
    </Switch>
  );
}

export default App;
