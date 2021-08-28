import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Home from '../../Component/Home';
import { fetchUserProfileAction } from '../../Actions/user';

import {
    selectUserInfo, selectInfoLoading, selectError
} from '../../Selectors/user';

const mapStateToProps = createStructuredSelector({
    isLoading: selectInfoLoading(),
    userInfo: selectUserInfo(),
    error: selectError()
})

const mapDispatchToProps = {
    fetchUserInfo: fetchUserProfileAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Home);