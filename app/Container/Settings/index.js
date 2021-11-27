import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Settings from '../../Component/Settings';
import { logoutRequestAction, } from '../../Actions/login';
import { updateUserSharingInfoAction } from '../../Actions/user';
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
    logout: logoutRequestAction,
    updateUserSharingInfo:updateUserSharingInfoAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);