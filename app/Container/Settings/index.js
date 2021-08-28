import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Settings from '../../Component/Settings';
import { logoutRequestAction } from '../../Actions/login';

import {
    selectLoginRequested, selectLoginError
} from '../../Selectors/login';

const mapStateToProps = createStructuredSelector({
   // isLoading: selectLoginRequested(),
   // authError: selectLoginError(),
    //   isAuthed: selectisAuthed()
})

const mapDispatchToProps = {
    logout: logoutRequestAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);