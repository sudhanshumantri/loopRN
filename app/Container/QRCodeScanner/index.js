import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import QRCodeScanner from '../../Component/QRCodeScanner';
import { validateQRCodeAction } from '../../Actions/user';

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

};
export default connect(mapStateToProps, mapDispatchToProps)(QRCodeScanner);