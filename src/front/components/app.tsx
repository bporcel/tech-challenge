import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import '../styles/global.scss';
import AllEvents from './pages/all-events.page';
import MyEvents from './pages/my-events.page';
import Layout from './molecules/layout.molecule';
import Modal from './molecules/modal.molecule';

const App: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <Route exact path="/">
                    <AllEvents />
                </Route>
                <Route exact path="/my-events">
                    <MyEvents />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Layout>
    );
};

export default App;
