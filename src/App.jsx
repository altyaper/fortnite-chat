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
import Predictions from './components/Predictions';
import Game from './components/Gameview';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route component={Homepage} exact path='/' />
        <Route component={Chatview} path="/chat" />
        <Route component={Leaderboard} path='/leaderboard' />
        <Route component={Predictions} path='/predictions' />
        <Route component={Game} path='/game' />
      </Switch>
    </Router>
  );
}

export default App;
