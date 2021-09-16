import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UpdatePassword from '../../Component/Security/updatePassword';
import { fetchUserProfileAction, updateUserPersonalInfoAction, updateUserProfilePicAction } from '../../Actions/user';

import {
    selectUserInfo, selectInfoLoading, selectError
} from '../../Selectors/user';

const mapStateToProps = createStructuredSelector({
    isLoading: selectInfoLoading(),
    userInfo: selectUserInfo(),
    error: selectError()
})

const mapDispatchToProps = {
    updateUserInfo: updateUserPersonalInfoAction,

};
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);