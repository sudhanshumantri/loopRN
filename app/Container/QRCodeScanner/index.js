import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import QRCodeScanner from '../../Component/QRCodeScanner';
import { validateQRCodeAction } from '../../Actions/user';

import {
    selectQRCodeData, selectInfoLoading, selectError
} from '../../Selectors/user';

const mapStateToProps = createStructuredSelector({
    isLoading: selectInfoLoading(),
    qrCodeData: selectQRCodeData(),
    error: selectError()
})

const mapDispatchToProps = {
    validateQRCode: validateQRCodeAction,

};
export default connect(mapStateToProps, mapDispatchToProps)(QRCodeScanner);