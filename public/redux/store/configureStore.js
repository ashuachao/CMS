import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/reducer';
import DevTools from '../../containers/DevTools/DevTools';
import clientMiddleware from '../middlewares/clientMiddleware';
import ApiClient from '../../helpers/ApiClient';
const client = new ApiClient();
const middleware = [clientMiddleware(client)];
const enhancer = compose(
    applyMiddleware(...middleware),
    DevTools.instrument()
);

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState, enhancer);
    if (module.hot) {
    	module.hot.accept("../reducers/reducer", () => {
    		store.replaceReducer(require("../reducers/reducer"))
    	})
    }
    return store;
}







// import {createStore as _createStore, applyMiddleware, compose, combineReducers} from 'redux';
// import clientMiddleware from './middlewares/clientMiddleware';
// import reducer from "./reducers/reducer";
// /**
//  * sync history between client and server
//  */
// import {syncHistoryWithStore} from "react-router-redux";
// /**
//  * devtools
//  */
// import {createDevTools} from 'redux-devtools';
// import LogMonitor from 'redux-devtools-log-monitor';
// import DockMonitor from 'redux-devtools-dock-monitor';
// const DevTools = createDevTools(
//     <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
//         <LogMonitor theme="tomorrow" preserveScrollTop={false}/>
//     </DockMonitor>
// )
// /**
//  * data is for same state(server and client) 
//  */
// // export default function createStore(client, data) {
// //     const middleware = clientMiddleware(client);    
// //     let finalCreateStore;
// //     // 开发环境下，而且有调试环境下
// //     if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
// //         const {persistState} = require('redux-devtools');
// //         const DevTools = require('../containers/DevTools/DevTools');
// //         finalCreateStore = compose(
// //             applyMiddleware(...middleware),
// //             window.devToolsExtension? window.devToolsExtension() : DevTools.instrument(),
// //             persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
// //         )(_createStore);
// //     } else {
// //         finalCreateStore = applyMiddleware(...middleware)(_createStore);
// //     }
    
// //     // 把创建store需要的注入
// //     reducer = combineReducers({
// //         ...reducer,
// //         routing: routerReducer
// //     })
// //     const store = finalCreateStore(reducer, data);
// //     );    
// //     //判断是否是热开发环境
// //     if (__DEVELOPMENT__ && module.hot) {
// //         module.hot.accept('./reducer/reducer.js', ()=> {
// //             store.replaceReducer(require(../reducer/reducer.js))
// //         })
// //     }   
// //     return store;
// // }
// export default function createStore(client) {
//     const middleware = clientMiddleware(client);
//     const store = applyMiddleware(middleware)(_createStore)(reducer, DevTools.instrucment());
//     return store;
// }