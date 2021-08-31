import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Contacts from '../../Component/Contacts';
import { fetchUserContactListAction } from '../../Actions/contacts';

import {
    selectContactList, selectIsLoading, selectError
} from '../../Selectors/contacts';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsLoading(),
    contactList: selectContactList(),
    error: selectError()
})

const mapDispatchToProps = {
    fetchUserContactList: fetchUserContactListAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);