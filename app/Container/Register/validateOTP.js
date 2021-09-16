import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ValidateOTP from '../../Component/Register/validateOTP';
import { registerUserAction, registerMobileAction } from '../../Actions/register';

import {
    selectRegisterMobileRequested, selectError, selectOTP, selectPhone
} from '../../Selectors/register';

const mapStateToProps = createStructuredSelector({
    error: selectError(),
    phoneValidationRequested: selectRegisterMobileRequested(),
    otp: selectOTP(),
    phone: selectPhone()
    //   isAuthed: selectisAuthed()
})

const mapDispatchToProps = {

    resendOTP: registerMobileAction

};
export default connect(mapStateToProps, mapDispatchToProps)(ValidateOTP);