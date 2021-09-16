import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ValidatePhone from '../../Component/Login/validatePhone';
import { loginMobileOTPAction } from '../../Actions/login';

import {
    selectLoginRequested, selectLoginError, selectLoginOTP
} from '../../Selectors/login';

const mapStateToProps = createStructuredSelector({
    isLoading: selectLoginRequested(),
    authError: selectLoginError(),
    otp: selectLoginOTP()
    //   isAuthed: selectisAuthed()
})

const mapDispatchToProps = {
    validatePhone: loginMobileOTPAction

};
export default connect(mapStateToProps, mapDispatchToProps)(ValidatePhone);