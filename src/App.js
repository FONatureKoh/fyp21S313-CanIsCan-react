import Login from './login/login';
import ResetPassword from './login/resetpassword'
import GeneralManager from './restaurant/GeneralManager/generalmanager';
import CustRegister from './register/custreg';
import RestRegister from './register/restreg';
import DeliveriesManager from './restaurant/DeliveriesManager/DeliveriesManager';
import ReservationsManager from './restaurant/ReservationsManager/ReservationsManager';
import Admin from './admin/Admin';
import Customer from './customer/Customer';
import { Route, Switch } from 'react-router-dom';
import Unauthorised from './components/Unauthorised';
import ErorrPage from './components/ErrorPage';

// useContext export. Function exported as default, so we provided the name here, as
// UserProvider, based on the UserContext.Provider 
import UserProvider from './store/user_context'; 

function App() {
  return (
    <Switch>
      <UserProvider>
        <Route exact path="/" component= {Login} />
        <Route exact path="/resetpassword" component= {ResetPassword} />
        <Route exact path="/custreg" component= {CustRegister} />
        <Route exact path="/restreg" component= {RestRegister} />
        <Route path="/generalmanager" component= {GeneralManager} />
        <Route path="/deliveriesmanager" component= {DeliveriesManager} />
        <Route path="/reservationsmanager" component= {ReservationsManager} />
        <Route path="/customer" component={Customer} />
        <Route path="/admin" component={Admin} />
        <Route path="/unauthorised" component= {Unauthorised} />
        <Route path="/error" component= {ErorrPage} />
      </UserProvider>
    </Switch>
  );
}

export default App;
