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
        'validate-phone': 'api/auth/validatePhone',
        'login': 'api/auth/sign_in',
        'OTP-login': 'api/auth/OTP_sign_in',
        'login-otp': 'api/auth/validateLoginPhone',
        'register': 'api/auth/register',
        'profile': 'api/user/',
        'update-password': 'api/user/updatePassword',
        'profile-pic': 'api/user/uploadProfilePciture',
        'sharing-info': 'api/user/sharingInfo',
        'scan-qrcode': 'api/user/scanQRCode',
        'contacts': 'api/user/conatcts',
        'update-notes-feelings':'api/user/updateNotesAndFeelings',
        'exchange-contact-with-user':'api/user/exchangeContact',
        'update-contact-sharing-preferences':'api/user/updateContactSharingPreferences',
        'feedback': 'api/user/shareFeedback',
        'app-version': 'api/appVersion'


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
//app specific api calls

export function callPostUserFeedback(data) {
    // api / login
    return callApi(getEndpoint('feedback'), {
        method: 'post',
        data,
        removeAuthorizationHeader: false
    });
}
export function callFetchAppVersion(data) {
    // api / login
    return callApi(getEndpoint('app-version'), {
        method: 'get',
        data,
        removeAuthorizationHeader: true
    });
}

//user auth

export function callUserOTPAuthentication(data) {
    // api / login
    return callApi(getEndpoint('OTP-login'), {
        method: 'post',
        data,
        removeAuthorizationHeader: true
    });
}
export function callUserAuthentication(data) {
    // api / login
    return callApi(getEndpoint('login'), {
        method: 'post',
        data,
        removeAuthorizationHeader: true
    });
}
export function callUserPhoneValidation(data) {
    // api / login
    return callApi(getEndpoint('login-otp'), {
        method: 'post',
        data,
        removeAuthorizationHeader: true
    });
}

export function callRegisterMobile(data) {
    //register
    return callApi(getEndpoint('validate-phone'), {
        method: 'post',
        data: data,
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
export function callUpdateUserPassword(data) {
    //  console.log(data);
    return callApi(getEndpoint('update-password'), {
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
export function callUpdateUserProfilePic(data) {
    //  console.log(data);
    return callApi(getEndpoint('profile-pic'), {
        method: 'post',
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
//update contact 
export function callupdateUserConact( data) {
    //  console.log(data);
    return callApi(getEndpoint('update-notes-feelings'), {
        method: 'put',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}

//exchange contact with user

export function callexchangeContactWithUser( data) {
    //  console.log(data);
    return callApi(getEndpoint('exchange-contact-with-user'), {
        method: 'post',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}


export function callupdateContactSharingPreferences( data) {
    //  console.log(data);
    return callApi(getEndpoint('update-contact-sharing-preferences'), {
        method: 'post',
        data,
        //    headers: { 'Authorization': "bearer " + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwIiwibmJmIjoxNTc5MDgwOTcyLCJleHAiOjE2MTA2MTY5NzIsImlhdCI6MTU3OTA4MDk3Mn0.21uvDxfuo_dBd9T0Rs4y4nXVjp3DRyVJsnzPP89umYo' },
        removeAuthorizationHeader: false
    });
}
