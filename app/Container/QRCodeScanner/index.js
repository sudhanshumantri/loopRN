import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import QRCodeScanner from '../../Component/QRCodeScanner';
import { validateQRCodeAction } from '../../Actions/user';
import { fetchUserContactListAction,updateContactInfoAction,exchangeContactInfoAction} from '../../Actions/contacts';

import {
    selectQRCodeData, selectInfoLoading, selectQRCodeError,selectUserInfo,selectInformationSharing
} from '../../Selectors/user';

const mapStateToProps = createStructuredSelector({
    isLoading: selectInfoLoading(),
    qrCodeData: selectQRCodeData(),
    error: selectQRCodeError(),
    userInfo: selectUserInfo(),
    userSharingInfo:selectInformationSharing(),
})

const mapDispatchToProps = {
    validateQRCode: validateQRCodeAction,
    updateContactInfo:updateContactInfoAction,
    exchangeContact:exchangeContactInfoAction

};
export default connect(mapStateToProps, mapDispatchToProps)(QRCodeScanner);