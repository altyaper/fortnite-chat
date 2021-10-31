import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Chatview from './components/Chatview';
import Homepage from './components/Homepage';
import Leaderboard from './components/Leaderboard';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Homepage} exact path='/' />
        <Route component={Chatview} path="/chat" />
        <Route component={Leaderboard} path='/leaderboard' />
      </Switch>
    </Router>
  );
}

export default App;
