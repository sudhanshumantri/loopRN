import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Profile from '../../Component/Profile';
import { fetchUserProfileAction,updateUserPersonalInfoAction } from '../../Actions/user';

import {
    selectUserInfo, selectInfoLoading, selectError
} from '../../Selectors/user';

const mapStateToProps = createStructuredSelector({
    isLoading: selectInfoLoading(),
    userInfo: selectUserInfo(),
    error: selectError()
})

const mapDispatchToProps = {
    fetchUserInfo: fetchUserProfileAction,
    updateUserInfo:updateUserPersonalInfoAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);