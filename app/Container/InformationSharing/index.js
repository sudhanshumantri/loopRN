import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InformationSharing from '../../Component/InformationSharing';
import { updateUserSharingInfoAction } from '../../Actions/user';

import {
 selectInfoLoading, selectError, selectInformationSharing
} from '../../Selectors/user';

const mapStateToProps = createStructuredSelector({
    isLoading: selectInfoLoading(),
    sharingInfo: selectInformationSharing(),
    error: selectError()
})

const mapDispatchToProps = {
    // fetchUserInfo: fetchUserProfileAction,
    updateUserSharingInfo:updateUserSharingInfoAction

};
export default connect(mapStateToProps, mapDispatchToProps)(InformationSharing);