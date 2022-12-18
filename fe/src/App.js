import { BrowserRouter ,Switch} from "react-router-dom";
import { Route } from "react-router";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Home";
import NewGame from "./Components/NewGame";

function App() {

  return (
    <div className="bg-[#F5F5F5] font-WorkSans">
      <div className="max-w-lg mx-auto h-screen bg-white">
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/newGame' component={NewGame} />
            </Switch>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
