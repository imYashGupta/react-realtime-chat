import './App.css';
import { Route,Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Init from "./pages/Init/Init";
function App() {
  return (
        <div>
          
            <Switch>
                <Route path="/home"  component={Home} />
                <Route path="/"  component={Init}  />
            </Switch>
        </div>
  );
}

export default App;
