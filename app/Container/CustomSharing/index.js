import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CustomSharing from '../../Component/CustomSharing/index';
import { fetchUserProfileAction,updateUserSharingInfoAction } from '../../Actions/user';
import { updateContactSharingPreferencesInfoAction } from '../../Actions/contacts';


import {
    selectUserInfo, selectInfoLoading, selectError,selectInformationSharing,selectIsInformationSharingUpdate
} from '../../Selectors/user';

const mapStateToProps = createStructuredSelector({
    isLoading: selectInfoLoading(),
    userInfo: selectUserInfo(),
    isInformationSharingUpdate:selectIsInformationSharingUpdate(),
    userSharingInfo:selectInformationSharing(),
    error: selectError()
})

const mapDispatchToProps = {
    updateUserSharingInfo:updateUserSharingInfoAction,
  

};
export default connect(mapStateToProps, mapDispatchToProps)(CustomSharing);