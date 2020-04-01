import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/global-styles';
import Theme from '../styles/theme';
import moment from 'moment-timezone';
import '../styles/global.scss';
import AllEvents from './pages/all-events.page';
import MyEvents from './pages/my-events.page';
import NoContent from './pages/no-content.page';
import Layout from './molecules/layout.molecule';

moment.tz.setDefault('UTC');

const App: React.FC = () => {
    return (
        <ThemeProvider theme={Theme}>
            <GlobalStyles />
            <Layout>
                <Switch>
                    <Route exact path="/">
                        <AllEvents />
                    </Route>
                    <Route exact path="/my-events">
                        <MyEvents />
                    </Route>
                    <Route exact path="/my-events/no-content">
                        <NoContent />
                    </Route>
                    <Redirect to="/" />
                </Switch>
            </Layout>
        </ThemeProvider>
    );
};

export default App;
