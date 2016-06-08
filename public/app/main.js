/** 
 * entry app.js for client(Broswer)
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
// import {syncHistoryWithStore, routerReducer} from "react-router-redux";
import getRoutes from "../routes/route";
import configureStore from "../redux/store/configureStore.js";
import DevTools from "../containers/Devtools/DevTools.js";

// for preload data but no render page
// import {ReduxAsyncConnect} from 'redux-async-connect';
const dest = document.getElementById('content');
const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store);
const component = (
  <Router history={browserHistory}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
    <Provider store={store} key="provider">
        <div>
            {component}
        </div>
    </Provider>,
    dest
)

/**
 * sync history between client and server
 */


/**
 * data is for same state(server and client) 
 */
// export default function createStore(client, data) {
//     const middleware = clientMiddleware(client);    
//     let finalCreateStore;
//     // 开发环境下，而且有调试环境下
//     if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
//         const {persistState} = require('redux-devtools');
//         const DevTools = require('../containers/DevTools/DevTools');
//         finalCreateStore = compose(
//             applyMiddleware(...middleware),
//             window.devToolsExtension? window.devToolsExtension() : DevTools.instrument(),
//             persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
//         )(_createStore);
//     } else {
//         finalCreateStore = applyMiddleware(...middleware)(_createStore);
//     }
    
//     // 把创建store需要的注入
//     reducer = combineReducers({
//         ...reducer,
//         routing: routerReducer
//     })
//     const store = finalCreateStore(reducer, data);
//     );    
//     //判断是否是热开发环境
//     if (__DEVELOPMENT__ && module.hot) {
//         module.hot.accept('./reducer/reducer.js', ()=> {
//             store.replaceReducer(require(../reducer/reducer.js))
//         })
//     }   
//     return store;
// }