import { useState } from "react";
import { BrowserRouter ,Switch} from "react-router-dom";
import { Route } from "react-router";
import Dashboard from "./Components/Dashboard";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import Register from "./Components/Register";
import UserContext from "./Context/UserContext";
import Home from "./Home";
import NewGame from "./Components/NewGame";

function App() {
  const [user,setUser] = useState({})

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div className="bg-[#F5F5F5] font-WorkSans">
        <div className="max-w-lg mx-auto h-screen bg-white">
            <BrowserRouter>
              <Switch>
                <Route exact path='/' component={Loading} />
                <Route path='/home' component={Home} />
                <Route path='/login' component={Login} />
                <Route path='/register' component={Register} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/newGame' component={NewGame} />
              </Switch>
            </BrowserRouter>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
