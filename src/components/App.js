import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Posts from "./Posts";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <Route exact={true} path="/" component={Posts} />
                </Router>
            </div>
        );
    }
}

export default App;
