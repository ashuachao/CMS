import React from 'react';
import {IndexRoute, Route} from 'react-router';
// some action 
import action from '../redux/reducers/reducer';
// page component 
import {App, Home, Register, CarLog, About, UserManage} from '../containers/rootContainer.js';
export default (store) => {
    // const requireLogin = (nextState, replace, cb) => {
    //     function checkAuth() {
    //         const {auth: {user}} = store.getState();
    //         if (!user) {
    //             replace('/')
    //         }
    //         cb();
    //     }
    //     if (!isAuthLoaded(store.getState())) {
    //         store.dispatch(loadAuth()).then(checkAuth);
    //     } else {
    //         checkAuth();
    //     }
    // }
    return (
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path="user/register" component={Register}/>
            <Route path="user/manage" component={UserManage}/>
            <Route path="carMan/carLog" component={CarLog} />
            <Route path="about" component={About} />
            <Route path='*' status={404}/>
        </Route>
    );
}