export default function clientMiddleware(client) {
    return ({dispatch, getState}) => {
            return next => action => {
            // redux-thunk
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }
            const {promise, types, ...rest} = action;
            if (!promise) {
                return next(action);
            }
            const [REQUSET, SUCCESS, FAILURE] = types;
            // first dispatch ({...rest, type: REQUSET})
            next({...rest, type: REQUSET});
            
            /**
             *  client is the clientApi
             */
            // wait for result, dispatch success or fail
            const actionPromise = promise(client);
            actionPromise.then(
                (result) => next({...rest, result, type: SUCCESS}),
                (error) => next({...rest, error, type: FAILURE})
            ).catch((error) => {
                console.error('Middleware Error', error);
                next({...rest, error, type: FAILURE});
            });
            return actionPromise;
        }
    }       
}
