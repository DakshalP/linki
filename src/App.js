import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import LinkList from './pages/LinkList';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import 'semantic-ui-css/semantic.min.css';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/list" component={LinkList} />
            <Route exact path="/auth/initial">
                <Auth authMode="initial_lock" />
            </Route>
            <Route exact path="/auth">
                <Auth authMode="unlock" />
            </Route>
            <Route exact path="/" component={Home} />
            <Route component={NotFound} />
        </Switch>
    </Router>
);

export default App;
