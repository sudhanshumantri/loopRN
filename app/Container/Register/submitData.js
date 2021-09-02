import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import CreatePassword from '../../Component/Register/createPassword';
import { registerUserAction, registerMobileAction } from '../../Actions/register';

import {
    selectIsUserRegistrationRequested, selectError
} from '../../Selectors/register';

const mapStateToProps = createStructuredSelector({
    error: selectError(),
    isUserRegistrationRequested: selectIsUserRegistrationRequested()
    //   isAuthed: selectisAuthed()
})

const mapDispatchToProps = {
    registerUser: registerUserAction,

};
export default connect(mapStateToProps, mapDispatchToProps)(CreatePassword);