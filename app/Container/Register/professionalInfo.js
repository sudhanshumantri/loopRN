import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProfessionalInfo from '../../Component/Register/professionalInformation';
import { updateUserPersonalInfoAction } from '../../Actions/user';

import {
    selectInfoLoading, selectError
} from '../../Selectors/user';

const mapStateToProps = createStructuredSelector({
    error: selectError(),
    isLoading: selectInfoLoading()
    //   isAuthed: selectisAuthed()
})

const mapDispatchToProps = {
    updateUserInformation: updateUserPersonalInfoAction,

};
export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalInfo);