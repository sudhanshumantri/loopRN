/*eslint-disable max-params*/
import axios from 'axios';
import { extend, isEmpty, isUndefined, startsWith, toNumber } from 'lodash';
import moment from 'moment';
import config from '../Config';
import {
  AsyncStorage,
} from 'react-native';

bootstrapAsyncUserToken = async () => {
  return {
    userId: await AsyncStorage.getItem('userId'),
    token: await AsyncStorage.getItem('token')
  };

};
// import {
//   responseErrorInterceptor,
//   responseInterceptor,
// } from 'Utils/errorHandlerInterceptor';
import queryString from 'query-string'

//import { getTokenFromKeychainAction } from './keychainHelper';

function queryParams(params) {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

function handleError(error, otherConfig) {
  // The connection errors aren't handled by axios
  // so handling it this way.
  // console.log('error in here',error)
  // if (isUndefined(error.response)) {
  //   const err = new Error('Connection Error');
  //   const errorObj = { err };
  //   errorObj.statusCode = 522;
  //   errorObj.message = 'connection-error';
  //   throw errorObj;
  // }
  const errorObj = new Error(error);
  // // errorObj.response = responseErrorInterceptor(error.response, otherConfig);

  throw errorObj;
}

/**.
 * make an http call using axios module with original config
 * otherConfig used to pass configs like errorHandling etc
 */
function makeAPICall(originalConfig, otherConfig) {
  console.log(originalConfig);
  return axios(originalConfig)
    .then(nextResponse => {
//console.log(nextResponse)
      return nextResponse;

    })
    .catch(error => {
      console.log(error)
      return error;
      //   return handleError(response, otherConfig)
    });
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * e.g. oof options {object}
 {
   method: 'POST',
   headers: {
     'Accept': 'application/json',
     'Content-Type': 'application/json',
 }
 *
 * @return {object}           The response data
 */

// axios.interceptors.request.use(request => {
//   console.log('Starting Request', request)
//   return request
// })

// axios.interceptors.response.use(response => {
//   console.log('Response:', response)
//   return response
// })


export default function callApi(url, options = {}, idToken) {

  const defaultHeaders = {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:8081/'
  };

  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

  const query = options.query || {};
  const method = options.method || 'get';
  const data = options.data || null;
  const headers = extend({ ...options.headers, ...defaultHeaders });
  const removeAuthorizationHeader = options.removeAuthorizationHeader || false;
  const timeout = options.timeout || null;
  const otherConfig = options.otherConfig || {};
  const isNewapi = (url) => {
    let returnValue = false;
    arr.map((val) => {

      if (url.indexOf(val) > -1) {
        returnValue = true
      }
    })
    return returnValue;
  }
  const originalConfig = {
    headers,
    method,
    query,
    url,
  };

  if (data) {
    originalConfig.data = data;
  }
  // console.log(originalConfig.data)

  if (timeout) {
    // axios expects timeout to be a no.
    originalConfig.timeout = toNumber(timeout);
  }

  if (!isEmpty(originalConfig.query)) {
    let urlWithQueryParams = url;
    urlWithQueryParams +=
      (urlWithQueryParams.indexOf('?') === -1 ? '?' : '&') +
      queryParams(originalConfig.query);
    delete originalConfig.query;
    originalConfig.url = urlWithQueryParams;
  }
  if (!removeAuthorizationHeader) {
    return bootstrapAsyncUserToken().then(info => {
      const acess_token = info.token;
      extend(originalConfig.headers, {
        Authorization: `Bearer ${acess_token}`
        //Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjI4IiwibmJmIjoxNTc5ODU5NTYzLCJleHAiOjE2MTEzOTU1NjMsImlhdCI6MTU3OTg1OTU2M30.Cx_zY40YVZYsAW37xiLTgdaKTo5FCOWoOpgmjDoZXhA`
      });
      return makeAPICall(originalConfig, otherConfig);
    })
      .catch((err) => {
        return err;

      });
  } else {

    return makeAPICall(originalConfig, otherConfig);
  }
}
