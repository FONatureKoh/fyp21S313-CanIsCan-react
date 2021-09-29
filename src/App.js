import './App.css';
import Login from './login/login';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
    </Switch>
  );
}

export default App;
