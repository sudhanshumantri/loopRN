import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Contacts from '../../Component/Contacts';
import { fetchUserContactListAction,updateContactInfoAction } from '../../Actions/contacts';

import {
    selectContactList, selectIsLoading, selectError
} from '../../Selectors/contacts';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsLoading(),
    contactList: selectContactList(),
    error: selectError()
})

const mapDispatchToProps = {
    fetchUserContactList: fetchUserContactListAction,
    updateContactInfo:updateContactInfoAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Contacts);