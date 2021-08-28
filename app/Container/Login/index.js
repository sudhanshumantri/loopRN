import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Login from '../../Component/Login';
import { loginAction } from '../../Actions/login';

import {
    selectLoginRequested, selectLoginError
} from '../../Selectors/login';

const mapStateToProps = createStructuredSelector({
    isLoading: selectLoginRequested(),
    authError: selectLoginError(),
    //   isAuthed: selectisAuthed()
})

const mapDispatchToProps = {
    authUser: loginAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Login);