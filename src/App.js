import './App.scss';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import AllBanks from './components/All banks/AllBanks';
import Favorites from './components/Favorites/Favorites';
import BankDetails from './components/BankDetails/BankDetails';


function App() {
  return (
    
    <div className="App">
      <Router>
          <Sidebar />
          <Switch >
            <Redirect exact from="/" to="/all_banks" />
              <Route path="/all_banks">
                 <AllBanks />
              </Route>
              <Route path="/favorites">
                  <Favorites />
              </Route>
              <Route path="/bank_details/:id" >
                <BankDetails />
              </Route>
              <Redirect path="*" to ="/all_banks" />
          </Switch>
       
          </Router>
    </div>
    
  );
}

export default App;
