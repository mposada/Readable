import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Posts from "./Posts";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact={true} path="/" component={Posts} />
                        <Route path="/react" component={Posts} />
                        <Route path="/redux" component={Posts} />
                        <Route path="/udacity" component={Posts} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
