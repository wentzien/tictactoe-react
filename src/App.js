import {Route, Switch, Redirect} from "react-router-dom";
import NotFound from "./common/notFound";
import Game from "./games/game";
import Home from "./home/home";
import "font-awesome/css/font-awesome.css";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/games/:id" component={Game}/>
                <Route exact path="/404" component={NotFound}/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/*">
                    <Redirect to="/404"/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;
