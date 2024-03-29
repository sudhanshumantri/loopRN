import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Home from '../../Component/Home';
import { fetchUserProfileAction,updateUserSharingInfoAction } from '../../Actions/user';

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
    fetchUserInfo: fetchUserProfileAction,
    updateUserSharingInfo:updateUserSharingInfoAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Home);