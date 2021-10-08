import Login from './login/login';
import GeneralManager from './restaurant/GeneralManager/generalmanager';
import CustRegister from './register/custreg';
import RestRegister from './register/restreg';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component= {Login} />
      <Route exact path="/custreg" component= {CustRegister} />
      <Route exact path="/restreg" component= {RestRegister} />
      <Route path="/generalmanager" component= {GeneralManager} />
    </Switch>
  );
}

export default App;
