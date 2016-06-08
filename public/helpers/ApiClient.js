import superagent from "superagent";
import config from "../../config/config";

const methods = ['get', 'post', 'put', 'patch', 'del'];

/**
 * 格式化URL
 */
// function formatUrl(path) {
//     const adjustedPath = path[0] !== '/' ? '/ ' + path : path;
//     if (__SERVER__) {
//         return 'http://' + config.apiHost + ":" + config.apiPort + adjustedPath;
//     } 
//     return '/api' + adjustedPath;
// }

class _ApiClient{
    /**
     * 实例化类之后就会有this[method]方法
     */
    constructor(req) {
        methods.forEach((method) => 
            this[method] = (path, {params, data} = {}) => new Promise((resolve,reject) => {
                const request = superagent[method]("http://192.168.1.120:3001" + path);
                request.set("Content-Type", "application/x-www-form-urlencoded");
                request.withCredentials();
                if (params) {
                    request.query(params);
                }
                // if (__SERVER__ && req.get('cookie')) {
                //     request.set('cookie', req.get('cookie'));
                // }
                
                if (data) {
                    request.send(data);
                }
                request.end((err, {body} = {}) => err ? reject(body || err) : resolve(body));
            })        
        )
    }
    empty() {}
}
const ApiClient = _ApiClient;
export default ApiClient;