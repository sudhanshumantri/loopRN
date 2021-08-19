import { fromJS, List } from 'immutable';
import {

    FETCH_USER_PROFILE_DETAILS_REQUESTED,
    FETCH_USER_PROFILE_DETAILS_SUCCESS,
    FETCH_USER_PROFILE_DETAILS_FAILED,
    SAVE_USER_PROFILE_DETAILS_REQUESTED,
    SAVE_USER_PROFILE_DETAILS_SUCCESS,
    SAVE_USER_PROFILE_DETAILS_FAILED,
    UPDATE_USER_PERSOANAL_DETAILS_REQUESTED,
    UPDATE_USER_PERSOANAL_DETAILS_SUCCESS,
    UPDATE_USER_PERSOANAL_DETAILS_FAILED,
    UPDATE_USER_PERMANENET_ADDRESS_FAILED,
    UPDATE_USER_PERMANENET_ADDRESS_REQUESTED,
    UPDATE_USER_PERMANENET_ADDRESS_SUCCESS,
    UPDATE_USER_ADDRESS_FAILED,
    UPDATE_USER_ADDRESS_REQUESTED,
    UPDATE_USER_ADDRESS_SUCCESS,
    FETCH_ROLES_REQUESTED,
    FETCH_ROLES_SUCCESS,
    FETCH_ROLES_FAILED,
    UPDATE_ROLES_REQUESTED,
    UPDATE_ROLES_SUCCESS,
    UPDATE_ROLES_FAILED,
    FETCH_STREAMS_REQUESTED,
    FETCH_STREAMS_SUCCESS,
    FETCH_STREAMS_FAILED,
    UPDATE_STREAMS_REQUESTED,
    UPDATE_STREAMS_SUCCESS,
    UPDATE_STREAMS_FAILED,
    DELETE_STREAM_REQUESTED,
    DELETE_STREAM_SUCCESS,
    DELETE_STREAM_FAILED,
    FETCH_QUALIFICATION_REQUESTED,
    FETCH_QUALIFICATION_SUCCESS,
    FETCH_QUALIFICATION_FAILED,
    UPDATE_QUALIFICATION_REQUESTED,
    UPDATE_QUALIFICATION_SUCCESS,
    UPDATE_QUALIFICATION_FAILED,
    DELETE_QUALIFICATION_REQUESTED,
    DELETE_QUALIFICATION_SUCCESS,
    DELETE_QUALIFICATION_FAILED,
    FETCH_SPECIALITY_REQUESTED,
    FETCH_SPECIALITY_SUCCESS,
    FETCH_SPECIALITY_FAILED,
    UPDATE_SPECIALITY_REQUESTED,
    UPDATE_SPECIALITY_SUCCESS,
    UPDATE_SPECIALITY_FAILED,
    UPDATE_PROFESSIONAL_INFO_REQUESTED,
    UPDATE_PROFESSIONAL_INFO_SUCCESS,
    UPDATE_PROFESSIONAL_INFO_FAILED,
    CREATE_HOME_VISIT_REQUESTED,
    CREATE_HOME_VISIT_SUCCESS,
    CREATE_HOME_VISIT_FAILED,
    CREATE_AMBULANCE_SERVICE_REQUESTED,
    CREATE_AMBULANCE_SERVICE_SUCCESS,
    CREATE_AMBULANCE_SERVICE_FAILED,
    CREATE_TPA_REQUESTED,
    CREATE_TPA_SUCCESS,
    CREATE_TPA_FAILED,
    CREATE_ONLINE_COSULTATION_REQUESTED,
    CREATE_ONLINE_COSULTATION_SUCCESS,
    CREATE_ONLINE_COSULTATION_FAILED,
    FETCH_HOME_VISIT_TYPE_REQUESTED,
    FETCH_HOME_VISIT_TYPE_SUCCESS,
    FETCH_HOME_VISIT_TYPE_FAILED,
    FETCH_AMBULANCE_TYPE_REQUESTED,
    FETCH_AMBULANCE_TYPE_SUCCESS,
    FETCH_AMBULANCE_TYPE_FAILED,
    FETCH_TPA_TYPE_REQUESTED,
    FETCH_TPA_TYPE_SUCCESS,
    FETCH_TPA_TYPE_FAILED,
    FETCH_LOCUM_REQUESTED,
    FETCH_LOCUM_SUCCESS,
    FETCH_LOCUM_FAILED,
    CREATE_LOCUM_REQUESTED,
    CREATE_LOCUM_SUCCESS,
    CREATE_LOCUM_FAILED,
    CREATE_DOCTOR_APPOINTMENT_INFO_REQUESTED,
    CREATE_DOCTOR_APPOINTMENT_INFO_SUCCESS,
    CREATE_DOCTOR_APPOINTMENT_INFO_FAILED,
    ADD_QUALIFICATION_FAILED,
    ADD_QUALIFICATION_SUCCESS,
    ADD_QUALIFICATION_REQUESTED,
    FETCH_CONSULTANT_DETAILS_REQUESTED,
    FETCH_CONSULTANT_DETAILS_SUCCESS,
    FETCH_CONSULTANT_DETAILS_FAILED,
    FETCH_USER_RELATIVES_REQUESTED,
    FETCH_USER_RELATIVES_SUCCESS,
    FETCH_USER_RELATIVES_FAILED,
    DELETE_USER_RELATIVES_REQUESTED,
    DELETE_USER_RELATIVES_SUCCESS,
    DELETE_USER_RELATIVES_FAILED,
    DELETE_SPECIALITY_REQUESTED,
    DELETE_SPECIALITY_SUCCESS,
    DELETE_SPECIALITY_FAILED,
    UPDATE_ONLINE_COSULTATION_SUCCESS,
    UPDATE_ONLINE_COSULTATION_REQUESTED,
    UPDATE_ONLINE_COSULTATION_FAILED,
    UPDATE_PROFILE_PIC_REQUESTED,
    UPDATE_PROFILE_PIC_SUCCESS,
    UPDATE_PROFILE_PIC_FAILED,
    UPDATE_FAMILY_PHYSICIAN_REQUESTED,
    UPDATE_FAMILY_PHYSICIAN_SUCCESS,
    UPDATE_FAMILY_PHYSICIAN_FAILED,
    FETCH_USER_MEMBERSHIP_PLAN_REQUESTED,
    FETCH_USER_MEMBERSHIP_PLAN_SUCCESS,
    FETCH_USER_MEMBERSHIP_PLAN_FAILED,
    TOGGLE_ONLINE_STATUS_SUCESS,
    FETCH_COMMON_SYMPTOMS_REQUESTED,
    FETCH_COMMON_SYMPTOMS_SUCCESS,
    FETCH_COMMON_SYMPTOMS_FAILED,
    SEARCH_ICDS_SUCCESS,
    SEARCH_ICDS_FAILED,
    SEARCH_ICDS_REQUESTED,
    FETCH_ALL_PROCEDURES_REQUESTED,
    FETCH_ALL_PROCEDURES_SUCCESS,
    FETCH_ALL_PROCEDURES_FAILED,
    FETCH_ALL_DIAGONISTIC_TEST_REQUESTED,
    FETCH_ALL_DIAGONISTIC_TEST_SUCCESS,
    FETCH_ALL_DIAGONISTIC_TEST_FAILED,
    FETCH_ALL_CARE_PLAN_REQUESTED,
    FETCH_ALL_CARE_PLAN_SUCCESS,
    FETCH_ALL_CARE_PLAN_FAILED,
    SEARCH_DRUGS_REQUESTED,
    SEARCH_DRUGS_FAILED,
    SEARCH_DRUGS_SUCCESS,
    FETCH_USER_REPORTS_FAILED,
    FETCH_USER_REPORTS_REQUESTED,
    FETCH_USER_REPORTS_SUCCESS,
    FETCH_SUPER_SPECIALITY_REQUESTED,
    FETCH_SUPER_SPECIALITY_SUCCESS,
    FETCH_SUPER_SPECIALITY_FAILED,
    FETCH_SERVICES_REQUESTED,
    FETCH_SERVICES_FAILED,
    FETCH_SERVICES_SUCCESS

} from '../Actions/actionTypes';
import { findIndex, remove } from 'lodash';
const INITIAL_STATE = fromJS({
    isInfoLoading: true,
    infoError: null,
    isUpdateRequested: false,
    isUpdateResidentialAddressRequested: false,
    isUpdatePermanentAddressRequested: false,
    showSpinner: false,
    userInfo: {},
    posts: [],
    userProfilePic: null,
    postLoading: true,
    error: null,
    roles: [],
    rolesError: null,
    services:[],
    servicesError:null,
    reports: [],
    reportsFetching: false,
    streams: [],
    streamsError: null,
    qualifications: [],
    qualificationsError: null,
    specialities: [],
    specialitiesError: null,
    superSpecialities: [],
    superSpecialitiesError: null,
    symptoms: [],
    symptomsError: null,
    professionalInfoError: null,
    ambulanceError: null,
    ambCRUDRequested: false,
    userambserviceId: '',
    ambulanceArrayIndex: '',
    homeVisitType: [],
    homevisitId: '',
    onlineCId: '',
    onlimeCRUDRequested: false,
    appointmentId: '',
    appointmentArrayIndex: '',
    appointmentCRUDRequested: false,
    homevisitArrayId: '',
    homeVisitCRUDRequested: false,
    drQuaIId: '',
    qualificationArrayIndex: '',
    userlocumId: '',
    locumArrayIndex: '',
    locumCRUDRequested: false,
    homeVisitError: null,
    ambulanceType: [],
    TPAType: [],
    usertpaId: '',
    tpaArrayIndex: '',
    tpaError: null,
    tpaCRUDRequested: false,
    locum: [],
    locumError: null,
    consultantInfo: {},
    isFetchingonsultantInfo: true,
    userRelative: [],
    relativesLoading: false,
    isDeleteRequested: false,
    membership: [],
    membershipLoading: false,
    membershipError: null,
    icds: [],
    carePlan: [],
    procedures: [],
    diagonisticTest: [],
    drugs: [],
    fetchEMRData: false

});

export default function userProfileReducer(state = INITIAL_STATE, action = {}) {
    let userInfoObject = state.toJS()['userInfo'];
    switch (action.type) {
        case FETCH_CONSULTANT_DETAILS_REQUESTED:
            return state.set('isFetchingonsultantInfo', true)
                .set('consultantInfo', {});
        case FETCH_CONSULTANT_DETAILS_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('isFetchingonsultantInfo', false)
                .set('consultantInfo', action.data)
                .set('error', null);
        case FETCH_USER_PROFILE_DETAILS_REQUESTED:
            return state.set('isInfoLoading', true)
                .set('error', null);
        case FETCH_USER_PROFILE_DETAILS_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('isInfoLoading', false)
                .set('userInfo', action.data)
                .set('error', null);
        case FETCH_USER_PROFILE_DETAILS_FAILED:
            return state.set('isInfoLoading', false)
                .set('error', action.error);
        case TOGGLE_ONLINE_STATUS_SUCESS:
            userInfoObject = state.toJS()['userInfo'];
            userInfoObject.userbasicinfo.online_status == 1 ? userInfoObject.userbasicinfo.online_status = 0 : userInfoObject.userbasicinfo.online_status = 1;
            return state.set(
                'userInfo', userInfoObject
            )
        //fetch user membership plans
        case FETCH_USER_MEMBERSHIP_PLAN_REQUESTED:
            return state.set('membershipLoading', true)
                .set('membershipError', null);
        case FETCH_USER_MEMBERSHIP_PLAN_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('membershipLoading', false)
                .set('membership', action.data)
                .set('membershipError', null);
        case FETCH_USER_MEMBERSHIP_PLAN_FAILED:
            return state.set('membershipLoading', false)
                .set('membership', [])
                .set('membershipError', action.error);
        //FETCH RELATIVE
        case FETCH_USER_RELATIVES_REQUESTED:
            return state.set('relativesLoading', true)
                .set('error', null);
        case FETCH_USER_RELATIVES_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('relativesLoading', false)
                .set('userRelative', action.data)
                .set('error', null);
        case FETCH_USER_RELATIVES_FAILED:
            return state.set('relativesLoading', false)
                .set('userRelative', [])
                .set('error', action.error);



        //delete
        case DELETE_USER_RELATIVES_REQUESTED:
            return state.set('relativesLoading', true)
                .set('error', null);
        case DELETE_USER_RELATIVES_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('relativesLoading', false)
                .set('error', null);
        case DELETE_USER_RELATIVES_FAILED:
            return state.set('relativesLoading', false)
                .set('error', action.error);

        //DELETE STREAMS
        case DELETE_STREAM_REQUESTED:
            return state.set('isDeleteRequested', true)
                .set('error', null);
        case DELETE_STREAM_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('isDeleteRequested', false)
                .set('error', null);
        case DELETE_STREAM_FAILED:
            return state.set('isDeleteRequested', false)
                .set('error', action.error);
        //save
        case SAVE_USER_PROFILE_DETAILS_REQUESTED:
            return state.set('isUpdateRequested', true)
        case SAVE_USER_PROFILE_DETAILS_SUCCESS:
            //  console.log(action.data.data.Admin);
            return state.set('isUpdateRequested', false)
        case SAVE_USER_PROFILE_DETAILS_FAILED:
            return state.set('isInfoLoading', false)
                .set('isUpdateRequested', false);

        case UPDATE_ONLINE_COSULTATION_REQUESTED:
            return state.set('isUpdateRequested', true)

        case UPDATE_ONLINE_COSULTATION_SUCCESS:
            //     console.log('UPDATE_USER_PERSOANAL_DETAILS_SUCCESS',userInfoObject.user)
            //  console.log(action.data.data.Admin);
            return state.set('isUpdateRequested', false)
        case UPDATE_ONLINE_COSULTATION_FAILED:
            return state
                .set('isUpdateRequested', false);


        case UPDATE_USER_PERSOANAL_DETAILS_REQUESTED:
            return state.set('isUpdateRequested', true)

        case UPDATE_USER_PERSOANAL_DETAILS_SUCCESS:
            //     console.log('UPDATE_USER_PERSOANAL_DETAILS_SUCCESS',userInfoObject.user)
            //  console.log(action.data.data.Admin);
            return state.set('isUpdateRequested', false)
        case UPDATE_USER_PERSOANAL_DETAILS_FAILED:

            return state.set('isInfoLoading', false)
                .set('isUpdateRequested', false);

        //RESIDENTIAL ADDRESS
        case UPDATE_USER_ADDRESS_REQUESTED:
            return state.set('isUpdateRequested', true)
                ;
        case UPDATE_USER_ADDRESS_SUCCESS:

            return state.set('isUpdateRequested', false)

        case UPDATE_USER_ADDRESS_FAILED:
            return state.set('isUpdateRequested', false)
                .set('error', action.error);


        //roles fetch
        case FETCH_ROLES_REQUESTED:
            return state
                .set('rolesError', null);
        case FETCH_ROLES_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('roles', action.data)
                .set('rolesError', null);
        case FETCH_ROLES_FAILED:
            return state
                .set('rolesError', action.error);


        //update roles
        case UPDATE_ROLES_REQUESTED:
            return state
                .set('rolesError', null);
        case UPDATE_ROLES_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('rolesError', null);
        case UPDATE_ROLES_FAILED:
            return state
                .set('rolesError', action.error);
     //roles services
        case FETCH_SERVICES_REQUESTED:
            return state
                .set('servicesError', null);
        case FETCH_SERVICES_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state.set('services', action.data)
                .set('servicesError', null);
        case FETCH_SERVICES_FAILED:
            return state
                .set('servicesError', action.error);
        //STREAMS
        case FETCH_STREAMS_REQUESTED:
            return state
                .set('streamsError', null);
        case FETCH_STREAMS_SUCCESS:

            return state.set('streams', action.data)
                .set('streamsError', null);
        case FETCH_STREAMS_FAILED:
            return state
                .set('streamsError', action.error);
        //update STREAMS
        case UPDATE_STREAMS_REQUESTED:
            return state
                .set('streamsError', null);
        case UPDATE_STREAMS_SUCCESS:

            return state
                .set('streamsError', null);
        case UPDATE_STREAMS_FAILED:
            return state
                .set('streamsError', action.error);

        //FETCH qualification

        case FETCH_QUALIFICATION_REQUESTED:
            return state
                .set('qualificationsError', null);
        case FETCH_QUALIFICATION_SUCCESS:

            return state.set('qualifications', action.data)
                .set('qualificationsError', null);
        case FETCH_QUALIFICATION_FAILED:
            return state
                .set('qualificationsError', action.error);
        //add qualification
        case ADD_QUALIFICATION_REQUESTED:
            return state
                .set('isUpdateRequested', true);
        case ADD_QUALIFICATION_SUCCESS:
            return state
                .set('isUpdateRequested', false)

        case ADD_QUALIFICATION_FAILED:
            return state
                .set('isUpdateRequested', false)
        //update qualification
        case UPDATE_QUALIFICATION_REQUESTED:
            return state
                .set('qualificationsError', null);
        case UPDATE_QUALIFICATION_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('qualificationsError', null);
        case UPDATE_QUALIFICATION_FAILED:
            return state
                .set('qualificationsError', action.error);
        //delete qualification

        case DELETE_QUALIFICATION_REQUESTED:
            return state
                .set('isDeleteRequested', true)
                .set('qualificationsError', null);
        case DELETE_QUALIFICATION_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('isDeleteRequested', false)
                .set('qualificationsError', null);
        case DELETE_QUALIFICATION_FAILED:
            return state
                .set('isDeleteRequested', false)
                .set('qualificationsError', action.error);


        //speciality
        case FETCH_SPECIALITY_REQUESTED:
            return state
                .set('specialitiesError', null);
        case FETCH_SPECIALITY_SUCCESS:

            return state.set('specialities', action.data)
                .set('specialitiesError', null);
        case FETCH_SPECIALITY_FAILED:
            return state
                .set('specialitiesError', action.error);

                 //superspeciality
        case FETCH_SUPER_SPECIALITY_REQUESTED:
            return state
                .set('superSpecialities', []);
        case FETCH_SUPER_SPECIALITY_SUCCESS:

            return state.set('superSpecialities', action.data)
                .set('superSpecialitiesError', null);
        case FETCH_SUPER_SPECIALITY_FAILED:
            return state
                .set('superSpecialitiesError', action.error);

        //symptoms
        case FETCH_COMMON_SYMPTOMS_REQUESTED:
            return state
                .set('symptomsError', null);
        case FETCH_COMMON_SYMPTOMS_SUCCESS:
            return state.set('symptoms', action.data)
                .set('symptomsError', null);
        case FETCH_COMMON_SYMPTOMS_FAILED:
            return state
                .set('symptomsError', action.error);

        //icds
        case SEARCH_ICDS_REQUESTED:
            return state
                .set('icds', [])
                .set('fetchEMRData', true);;
        case SEARCH_ICDS_SUCCESS:
            return state.set('icds', action.data)
                .set('fetchEMRData', false);
            ;
        case SEARCH_ICDS_FAILED:
            return state
                .set('icds', [])
                .set('fetchEMRData', false);;


        //procedure
        case FETCH_ALL_PROCEDURES_REQUESTED:
            return state
                .set('procedures', []);
        case FETCH_ALL_PROCEDURES_SUCCESS:
            return state.set('procedures', action.data);
        case FETCH_ALL_PROCEDURES_FAILED:
            return state
                .set('procedures', []);

        //care plan
        case FETCH_ALL_CARE_PLAN_REQUESTED:
            return state
                .set('carePlan', []);
        case FETCH_ALL_CARE_PLAN_SUCCESS:
            return state.set('carePlan', action.data);
        case FETCH_ALL_CARE_PLAN_FAILED:
            return state
                .set('carePlan', []);

        //diagonistic test
        case FETCH_ALL_DIAGONISTIC_TEST_REQUESTED:
            return state
                .set('diagonisticTest', []);
        case FETCH_ALL_DIAGONISTIC_TEST_SUCCESS:
            return state.set('diagonisticTest', action.data);
        case FETCH_ALL_DIAGONISTIC_TEST_FAILED:
            return state
                .set('diagonisticTest', []);

        //drugs search
        case SEARCH_DRUGS_REQUESTED:
            return state
                .set('fetchEMRData', true)
                .set('drugs', []);
        case SEARCH_DRUGS_SUCCESS:
            return state.set('drugs', action.data)
                .set('fetchEMRData', false);
        case SEARCH_DRUGS_FAILED:
            return state
                .set('icds', [])
                .set('fetchEMRData', false);



        //update STREAMS
        case UPDATE_SPECIALITY_REQUESTED:
            return state
                .set('isUpdateRequested', true)
        case UPDATE_SPECIALITY_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('isUpdateRequested', false)
        case UPDATE_SPECIALITY_FAILED:
            return state
                .set('isUpdateRequested', false)

        //delete speciality
        case DELETE_SPECIALITY_REQUESTED:
            return state
                .set('isDeleteRequested', true)
                .set('qualificationsError', null);
        case DELETE_SPECIALITY_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('isDeleteRequested', false)
                .set('qualificationsError', null);
        case DELETE_SPECIALITY_FAILED:
            return state
                .set('isDeleteRequested', false)
                .set('qualificationsError', action.error);

        //professionalInfoError

        case UPDATE_PROFESSIONAL_INFO_REQUESTED:
            return state
                .set('professionalInfoError', null);
        case UPDATE_PROFESSIONAL_INFO_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('professionalInfoError', null);
        case UPDATE_PROFESSIONAL_INFO_FAILED:
            return state
                .set('professionalInfoError', action.error);

        //ambulance service :
        case UPDATE_PROFILE_PIC_REQUESTED:
            return state
                .set('isUpdateRequested', true);
        case UPDATE_PROFILE_PIC_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('isUpdateRequested', false);
        case UPDATE_PROFILE_PIC_FAILED:
            return state
                .set('isUpdateRequested', false);
        case UPDATE_FAMILY_PHYSICIAN_REQUESTED:
            return state
                .set('isUpdateRequested', true);
        case UPDATE_FAMILY_PHYSICIAN_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('isUpdateRequested', false);
        case UPDATE_FAMILY_PHYSICIAN_FAILED:
            return state
                .set('isUpdateRequested', false);

        case CREATE_AMBULANCE_SERVICE_REQUESTED:
            return state
                .set('ambulanceError', null)
                .set('ambCRUDRequested', true);
        case CREATE_AMBULANCE_SERVICE_SUCCESS:
            return state
                .set('ambulanceError', null)
                .set('ambCRUDRequested', false)
                .set('userambserviceId', action.data.userambserviceId)
                .set('ambulanceArrayIndex', action.data.ambulanceArrayIndex);
        case CREATE_AMBULANCE_SERVICE_FAILED:
            return state
                .set('ambCRUDRequested', false)
                .set('ambulanceError', action.error);

        //HOME VISIT
        case CREATE_HOME_VISIT_REQUESTED:
            return state
                .set('homeVisitCRUDRequested', true)
                .set('homeVisitError', null);
        case CREATE_HOME_VISIT_SUCCESS:
            return state
                .set('homeVisitCRUDRequested', false)
                .set('homevisitId', action.data.homevisitId)
                .set('homevisitArrayId', action.data.homevisitArrayId);
        case CREATE_HOME_VISIT_FAILED:
            return state
                .set('homeVisitCRUDRequested', false)
                .set('homeVisitError', action.error);
        //TPA
        case CREATE_TPA_REQUESTED:
            return state
                .set('tpaError', null)
                .set('tpaCRUDRequested', true);

        case CREATE_TPA_SUCCESS:
            //  console.log(action.data.data.Admin.user_icons);
            return state
                .set('tpaError', null)
                .set('usertpaId', action.data.usertpaId)
                .set('tpaArrayIndex', action.data.tpaArrayIndex)
                .set('tpaCRUDRequested', false);
        case CREATE_TPA_FAILED:
            return state
                .set('tpaError', action.error)
                .set('tpaCRUDRequested', false);

        //create online consulation

        case CREATE_ONLINE_COSULTATION_REQUESTED:
            return state
                .set('onlimeCRUDRequested', true);
        case CREATE_ONLINE_COSULTATION_SUCCESS:

            return state.set('onlineCId', action.data)
                .set('onlimeCRUDRequested', false);
        case CREATE_ONLINE_COSULTATION_FAILED:
            return state
                .set('onlimeCRUDRequested', false);

        //fetch home visit
        case FETCH_HOME_VISIT_TYPE_REQUESTED:
            return state
                .set('homeVisitError', null);
        case FETCH_HOME_VISIT_TYPE_SUCCESS:

            return state.set('homeVisitType', action.data)
                .set('homeVisitError', null);
        case FETCH_HOME_VISIT_TYPE_FAILED:
            return state
                .set('homeVisitError', action.error);
        // //fetch ambulance type
        case FETCH_AMBULANCE_TYPE_REQUESTED:
            return state
                .set('ambulanceError', null);
        case FETCH_AMBULANCE_TYPE_SUCCESS:
            return state.set('ambulanceType', action.data)
                .set('ambulanceError', null);
        case FETCH_AMBULANCE_TYPE_FAILED:
            return state
                .set('ambulanceError', action.error);
        //fetch tpa type
        case FETCH_TPA_TYPE_REQUESTED:
            return state
                .set('tpaError', null);
        case FETCH_TPA_TYPE_SUCCESS:
            return state.set('TPAType', action.data)
                .set('tpaError', null);
        case FETCH_TPA_TYPE_FAILED:
            return state
                .set('tpaError', action.error);

        //locum:[],
        //    locumError: null
        case FETCH_LOCUM_REQUESTED:
            return state
                .set('locumError', null);
        case FETCH_LOCUM_SUCCESS:
            return state.set('locum', action.data)
                .set('locumError', null);
        case FETCH_LOCUM_FAILED:
            return state
                .set('locumError', action.error);


        case CREATE_LOCUM_REQUESTED:
            return state
                .set('locumCRUDRequested', true)
                .set('locumError', null);
        case CREATE_LOCUM_SUCCESS:
            return state
                .set('locumCRUDRequested', false)
                .set('userlocumId', action.data.userlocumId)
                .set('locumArrayIndex', action.data.locumArrayIndex)

                .set('locumError', null);
        case CREATE_LOCUM_FAILED:
            return state
                .set('locumCRUDRequested', false)
                .set('locumError', action.error);

        //appoint info doctor
        case CREATE_DOCTOR_APPOINTMENT_INFO_REQUESTED:
            return state
                .set('appointmentCRUDRequested', true);
        case CREATE_DOCTOR_APPOINTMENT_INFO_SUCCESS:
            return state
                .set('appointmentCRUDRequested', false)
                .set('appointmentArrayIndex', action.data.appointmentArrayIndex)
                .set('appointmentId', action.data.appointmentId)
                ;
        case CREATE_DOCTOR_APPOINTMENT_INFO_FAILED:
            return state
                .set('appointmentCRUDRequested', false)
        //.set('homeVisitError', action.error);


        case FETCH_USER_REPORTS_REQUESTED:
            return state.set('reportsFetching', true)
                .set('reports', [])
                .set('error', null);
        case FETCH_USER_REPORTS_SUCCESS:
          //  console.log('FETCH_USER_REPORTS_SUCCESS', action);
            return state.set('reportsFetching', false)
                .set('reports', action.data)
                .set('error', null);
        case FETCH_USER_REPORTS_FAILED:
            return state.set('reportsFetching', false)
                .set('reports', [])
                .set('error', action.error);
        default:
            return state;


    }
}
