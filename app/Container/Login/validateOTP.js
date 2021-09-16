import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ValidateOTP from '../../Component/Login/validateOTP';
import { loginAction, loginMobileOTPAction } from '../../Actions/login';
import {
    selectLoginRequested, selectLoginError, selectLoginOTP, selectPhone
} from '../../Selectors/login';

const mapStateToProps = createStructuredSelector({
    isLoading: selectLoginRequested(),
    authError: selectLoginError(),
    otp: selectLoginOTP(),
    phone: selectPhone()
    //   isAuthed: selectisAuthed()
})
const mapDispatchToProps = {
    authUser: loginAction,
    resendOTP: loginMobileOTPAction

};
export default connect(mapStateToProps, mapDispatchToProps)(ValidateOTP);