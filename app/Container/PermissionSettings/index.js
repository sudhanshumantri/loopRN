import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PermissionSettings from '../../Component/PermissionSettings';
import { fetchUserProfileAction, updateUserSharingInfoAction, } from '../../Actions/user';
import { fetchUserContactListAction, updateContactInfoAction, updateContactSharingPreferencesInfoAction } from '../../Actions/contacts';
import {
    selectUserInfo, selectInfoLoading, selectError, selectInformationSharing, selectIsInformationSharingUpdate
} from '../../Selectors/user';

import {
    selectIsContactLoading
} from '../../Selectors/contacts';
const mapStateToProps = createStructuredSelector({
    isLoading: selectInfoLoading(),
    userInfo: selectUserInfo(),
    userSharingInfo: selectInformationSharing(),
    isContactUpdating: selectIsContactLoading()

})
const mapDispatchToProps = {
    updateContactInfo: updateContactInfoAction,
    updateContactSharingPreferences: updateContactSharingPreferencesInfoAction

};
export default connect(mapStateToProps, mapDispatchToProps)(PermissionSettings);