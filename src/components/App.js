import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Posts from "./Posts";
import PostDetail from "./PostDetail";
import "./App.css";

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <Route exact={true} path="/" component={Posts} />
                        <Route exact={true} path="/react" component={Posts} />
                        <Route exact={true} path="/redux" component={Posts} />
                        <Route exact={true} path="/udacity" component={Posts} />
                        <Route path="/:category/:id" component={PostDetail} />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
