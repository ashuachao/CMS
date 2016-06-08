/**
 * userMsg reducer
 */
const LOAD = "userMsg/LOAD";
const LOAD_SUCCESS = "userMsg/LOAD_SUCCESS";
const LOAD_FAIL = "userMsg/LOAD_FAIL";
const UPDATE = "userMsg/UPDATE";
const UPDATE_SUCCESS = "userMsg/UPDATE_SUCCESS";
const UPDATE_FAIL = "userMsg/UPDATE_FAIL";

const initialState = {
    loaded: false,
    result: {
        user: {
            
        }
    },
    page: "UserMsg"
}

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD:
            return {
                ...state,
                loading: true
            }        
        case LOAD_SUCCESS: 
            return {
                ...state,
                loading: false,
                loaded: true,
                result: action.result
            }
        case LOAD_FAIL: 
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            }
        case UPDATE:
            return {
                ...state,
                updating: true
            }        
        case UPDATE_SUCCESS: 
            return {
                ...state,
                updating: false,
                updated: true,
                result: action.result
            }
        case UPDATE_FAIL: 
            return {
                ...state,
                updating: false,
                updated: false,
                error: action.error
            }
        default:
            return state; 
    }
}

export function load(name) {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.post(`/user/getUser/${name}`)
    }
}
export function update(user) {
    return {
        types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
        promise: (client) => client.post('/user/updateUser', {
            data: user
        })
    }
}
