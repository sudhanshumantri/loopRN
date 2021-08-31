/* eslint-disable no-undef*/
import * as _ from 'lodash';
import config from '../Config';
import callApi from './request';


const axios = require("axios");

/*

 * App Apis
 *
 * Follow this format:
 * export const API_CONSTANT = `${base}/api end point`;
 */

// Endpoint could be local as well if we're serving jsons
const endpointLocation = 'remote';
const urls = {
    remote: {
        'login': 'api/auth/sign_in',
        'register': 'api/auth/register',
        'profile': 'api/user/',
        'sharing-info': 'api/user/sharingInfo',
        'scan-qrcode': 'api/user/scanQRCode',
        'contacts': 'api/user/conatcts',
    }
}

function getEndpoint(endpoint) {
    if (urls[endpointLocation][endpoint]) {
        return config.api.host
            + urls[endpointLocation][endpoint];
    }
    return null;
}

function generateDefaultHeaders() {
    return {
        'Content-type': 'application/x-www-form-urlencoded'
    };
}
function generateFormDataHeaders() {
    return {
        "Content-Type": "multipart/form-data"
    }
}
function generateDefaultGetHeaders() {
    return {
        'Content-Type': 'application/json;'
    };
}
// /**
//  * API triggered for fetching user subscribed/Profile
//  * @return {obejct} of packages
//  */

export function callUserAuthentication(data) {
    // api / login
    return callApi(getEndpoint('login'), {
        method: 'post',
        data,
        removeAuthorizationHeader: true
    });
}

export function callRegisterUser(data) {
    //register
    return callApi(getEndpoint('register'), {
        method: 'post',
        data: data,
        removeAuthorizationHeader: true
    });
}
export function callFetchUserInfo() {
    //  console.log(data);
    return callApi(getEndpoint('profile'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callUpdateUserInfo(data) {
    //  console.log(data);
    return callApi(getEndpoint('profile'), {
        method: 'put',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callUpdateUserSharingInfo(data) {
    //  console.log(data);
    return callApi(getEndpoint('sharing-info'), {
        method: 'put',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
export function callValidateQRCode(data) {
    //  console.log(data);
    return callApi(getEndpoint('scan-qrcode'), {
        method: 'post',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
//fetch user contact list
export function callFetchUserContactList() {
    //  console.log(data);
    return callApi(getEndpoint('contacts'), {
        method: 'get',
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}


//fetch chat list


