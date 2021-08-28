import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Register from '../../Component/Register';
import { registerUserAction } from '../../Actions/register';

import {
    selectIsOTPRequestedRequested, selectError
} from '../../Selectors/register';

const mapStateToProps = createStructuredSelector({
    error: selectError(),
    //   isAuthed: selectisAuthed()
})

const mapDispatchToProps = {
    registerUser: registerUserAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Register);