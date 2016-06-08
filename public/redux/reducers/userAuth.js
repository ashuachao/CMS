/**
 * auth reducer
 */
const LOAD = "auth/LOAD";
const LOAD_SUCCESS = "auth/LOAD_SUCCESS";
const LOAD_FAIL = "auth/LOAD_FAIL";
const REGISTER = "user/REGISTER";
const REGISTER_SUCCESS = "user/REGISTER_SUCCESS";
const REGISTER_FAIL = "user/REGISTER_FAIL";
const LOGIN = "user/LOGIN";
const LOGIN_SUCCESS = "user/LOGIN_SUCCESS";
const LOGIN_FAIL = "user/LOGIN_FAIL"; 
const LOGOUT = "user/LOGOUT";
const LOGOUT_SUCCESS = "user/LOGOUT_SUCCESS";
const LOGOUT_FAIL = "user/LOGOUT_FAIL"; 
const GUEST = "auth/GUEST";
const GUEST_SUCCESS = "auth/GUEST_SUCCESS";
const GUEST_FAIL = "auth/GUEST_FAIL";
const GUESTLOGIN = "auth/GUESTLOGIN";
const GUESTLOGIN_SUCCESS = "auth/GUESTLOGIN_SUCCESS";
const GUESTLOGIN_FAIL = "auth/GUESTLOGIN_FAIL";
const GUESTPRICE = "auth/GUESTPRICE";
const GUESTPRICE_SUCCESS = "auth/GUESTPRICE_SUCCESS";
const GUESTPRICE_FAIL = "auth/GUESTPRICE_FAIL";

const initialState = {
    loaded: false
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
                user: action.result
            }
        case LOAD_FAIL: 
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error
            }
        case LOGIN:
            return {
                ...state,
                loggingIn: true,
            }        
        case LOGIN_SUCCESS: 
            return {
                ...state,
                loggingIn: false,
                result: action.result
            }
        case LOGIN_FAIL: 
            return {
                ...state,
                loggingIn: false,
                user: null,
                loginError: action.error
            }
        case LOGOUT:
            return {
                ...state,
                loggingOut: true
            }        
        case LOGOUT_SUCCESS: 
            return {
                ...state,
                loggingOut: false,
                user: null
            }
        case LOGOUT_FAIL: 
            return {
                ...state,
                loggingOut: false,
                logoutError: action.error
            }
        case REGISTER:
            return {
                ...state,
                registerIn: true
            }        
        case REGISTER_SUCCESS: 
            return {
                ...state,
                registerIn: false,
                result: action.result
            }
        case REGISTER_FAIL: 
            return {
                ...state,
                registerIn: false,
                logoutError: action.error
            }
        case GUEST:
            return {
                ...state,
                guestIn: true
            }        
        case GUEST_SUCCESS: 
            return {
                ...state,
                guestIn: false,
                result: action.result
            }
        case GUEST_FAIL: 
            return {
                ...state,
                guestIn: false,
                guestError: action.error
            }
        case GUESTLOGIN:
            return {
                ...state,
                guestIn: true
            }        
        case GUESTLOGIN_SUCCESS: 
            return {
                ...state,
                guestIn: false,
                result: action.result
            }
        case GUESTLOGIN_FAIL: 
            return {
                ...state,
                guestIn: false,
                guestError: action.error
            }
        case GUESTPRICE:
            return {
                ...state,
            }        
        case GUESTPRICE_SUCCESS: 
            return {
                ...state,
                result: action.result
            }
        case GUESTPRICE_FAIL: 
            return {
                ...state,
                guestPriceError: action.error
            }
        default:
            return state; 
    }
}

export function isLoaded(globalState) {
    return globalState.user && globalState.user.loaded;
}

export function load() {
    return {
        types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
        promise: (client) => client.get('/loadAuth')
    }
}

export function register(user) {
    return {
        types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
        promise: (client) => client.post('/user/register', {
            data: {
                userName: user.userName,
                password: user.password
            }
        })
    }
}

export function login(name) {
    return {
        types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
        promise: (client) => client.post('/user/login', {
            data: {
                userName: name
            }
        })
    }
}

export function logout() {
    return {
        types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
        promise: (client) => client.get('/user/logout')
    }
}

export function guest() {
    return {
        types: [GUEST, GUEST_SUCCESS, GUEST_FAIL],
        promise: (client) => client.post('/user/guest')
    }
}

export function guestLogin(guestId) {
    return {
        types: [GUESTLOGIN, GUESTLOGIN_SUCCESS, GUESTLOGIN_FAIL],
        promise: (client) => client.post('/user/guestLogin',{
            data: {
                user: guestId
            }
        })
    }
}

export function guestPrice(guestId) {
    return {
        types: [GUESTPRICE, GUESTPRICE_SUCCESS, GUESTPRICE_FAIL],
        promise: (client) => client.post('/user/guestPrice',{
            data: {
                user: guestId
            }
        })
    }
}