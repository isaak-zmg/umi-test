
import axios from "axios";
import { getToken } from './auth_config';
import { notification } from 'antd';
import qs from 'qs';



const contentTypes = {
    json: 'application/json',
    form: 'application/x-www-form-urlencoded'
};


const authHeader = {
    "Authorization": `Bearer ${getToken()}`
}

export default {
    get: async (url, params) => {
        try {
            return await axios.get(url, { params });
        } catch ({ response }) {
            return errorHandler(response);
        }
    },
    post: async (url, data, options?) => {
        let headers = { 'content-type': contentTypes.form }
        if (options) {
            headers = {
                ...options
            }
        }
        try {
            return await axios.request({
                method: "post",
                url: url,
                headers: headers,
                data: qs.stringify(data)
            })

        } catch ({ response }) {
            return errorHandler(response);
        }
    },
    put: async (url, params) => {
        try {
            return await axios.put(url, params);
        } catch ({ response }) {
            return errorHandler(response);
        }
    },
    delete: async url => {
        try {
            return await axios.delete(url);
        } catch ({ response }) {
            return errorHandler(response);
        }
    },
    authGet: async (url, params?) => {
        try {
            const config = {
                params,
                headers: authHeader,
            }
            return await axios.get(url, config);
        } catch ({ response }) {
            return errorHandler(response);
        }
    },
    authPost: async (url, data, options?) => {
        let headers = { 'content-type': contentTypes.form }
        if (options) {
            headers = {
                ...options
            }
        }
        try {
            return await axios.request({
                method: "post",
                url: url,
                headers: headers,
                data: qs.stringify(data)
            })

        } catch ({ response }) {
            return errorHandler(response);
        }
    },
    authPut: async (url, params?) => {
        try {
            return await axios.put(url, params, { headers: authHeader });
        } catch ({ response }) {
            return errorHandler(response);
        }
    },
    authDelete: async (url, params) => {
        try {
            const config = {
                ...params,
                headers: authHeader,
            }
            return await axios.delete(url, config);
        } catch ({ response }) {
            return errorHandler(response);
        }
    },
};



const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    405: '请求方法不被允许。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

const errorHandler = (response) => {
    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;

        notification.error({
            message: `请求错误 ${status}: ${url}`,
            description: errorText,
        });
    }

    if (!response) {
        notification.error({
            description: '您的网络发生异常，无法连接服务器',
            message: '网络异常',
        });
    }
    throw response;
};



// const errorHandler = response => {
//     switch (response.status) {
//         case 401:
//             console.log("Unauthorized request");
//             throw response;
//         case 403:
//             console.log("Forbidden");
//             throw response;
//         case 404:
//             console.log("Not found");
//             throw response;
//         case 422:
//             throw validationErrorHandler(response.data.errors);
//         default:
//             console.log("Unknown Error");
//             throw response;
//     }
// };


// const validationErrorHandler = errors => {
//     const arr: any = [];
//     for (let errorType in errors) {
//         errors[errorType].forEach(message => {
//             arr.push(`${errorType} ${message}`)
//         })
//     }
//     return arr;
// }

