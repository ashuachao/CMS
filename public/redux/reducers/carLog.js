/**
 * carManage reducer
 */
const LOAD = "carManage/LOAD";
const LOAD_SUCCESS = "carManage/LOAD_SUCCESS";
const LOAD_FAIL = "carManage/LOAD_FAIL";
const LOADGUEST = "carManage/LOADGUEST";
const LOADGUEST_SUCCESS = "carManage/LOADGUEST_SUCCESS";
const LOADGUEST_FAIL = "carManage/LOADGUEST_FAIL";

const initialState = {
    loaded: false,
    result: {
        carLogs: []
    },
    page: "CarLog"
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
        case LOADGUEST:
            return {
                ...state,
                loading: true
            }        
        case LOADGUEST_SUCCESS: 
            return {
                ...state,
                loading: false,
                loaded: true,
                result: action.result
            }
        case LOADGUEST_SUCCESS: 
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            }
        default:
            return state; 
    }
}

export function load(user) {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.post(`/carMan/carLog/`, {
            data: {
                user
            }
        })
    }
}
export function loadGuest(user) {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.post(`/carMan/carLog/guest`, {
            data: {
                user
            }
        })
    }
}

