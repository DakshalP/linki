import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Meetings from './pages/Meetings';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import 'semantic-ui-css/semantic.min.css';
import NewMeeting from './pages/NewMeeting';

const App = () => {
    let [store, setStore] = useState();
    return (
        <Router>
            <Switch>
                <Route exact path="/meetings">
                    {!store ? <NotFound /> : <Meetings store={store} />}
                </Route>
                <Route exact path="/meetings/new">
                    {!store ? <NotFound /> : <NewMeeting store={store} />}
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
