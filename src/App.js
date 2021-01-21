import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Meetings from './pages/Meetings';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import 'semantic-ui-css/semantic.min.css';
import NewMeeting from './pages/NewMeeting';

const App = () => {
    const [store, setStore] = useState();

    return (
        <Router>
            <Switch>
                <Route exact path="/meetings">
                    {!store ? (
                        <Redirect to="/auth" />
                    ) : (
                        <Meetings store={store} />
                    )}
                </Route>
                <Route exact path="/meetings/new">
                    {!store ? (
                        <Redirect to="/auth" />
                    ) : (
                        <NewMeeting store={store} />
                    )}
                </Route>
                <Route exact path="/auth">
                    <Auth setStore={setStore} />
                </Route>
                <Route exact path="/" component={Home} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    );
};

export default App;
