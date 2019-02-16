import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Spa from './Spa';

export default class AppRouter extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Spa} />
            </Switch>
        )
    }
}