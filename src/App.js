import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Links from './pages/Links';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
    let [store, setStore] = useState({});
    return (
        <Router>
            <Switch>
                <Route exact path="/links" component={Links} />
                <Route exact path="/auth" component={Auth} />
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
