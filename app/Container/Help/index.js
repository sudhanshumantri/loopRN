import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Help from '../../Component/Help';
import { postFeedbackAction } from '../../Actions/util';

import {
    selectContactList, selectIsLoading, selectError
} from '../../Selectors/contacts';

const mapStateToProps = createStructuredSelector({
    // isLoading: selectIsLoading(),
    // contactList: selectContactList(),
    // error: selectError()
})

const mapDispatchToProps = {
    postFeedback: postFeedbackAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Help);