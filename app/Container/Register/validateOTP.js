import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ValidateOTP from '../../Component/Register/validateOTP';
import { generateOTPAction, validateOTPAction, registerUserAction } from '../../Actions/register';

import {
    selectIsOTPRequestedRequested,
    selectError,
    selectOTP,
    selectOTPToken,
    selectIsOTPValidationRequested,
    selectIsOTPValidated,
    selectIsUserRegistrationRequested
} from '../../Selectors/register';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsOTPRequestedRequested(),
    error: selectError(),
    generatedOTP: selectOTP(),
    otpToken: selectOTPToken(),
    isValidationRequested: selectIsOTPValidationRequested(),
    isOTPValidated: selectIsOTPValidated(),
    isUserRegistrationRequested: selectIsUserRegistrationRequested()
    //   isAuthed: selectisAuthed()
})

const mapDispatchToProps = {
    generateOTP: generateOTPAction,
    validateOTP: validateOTPAction,
    registerUser: registerUserAction

};
export default connect(mapStateToProps, mapDispatchToProps)(ValidateOTP);