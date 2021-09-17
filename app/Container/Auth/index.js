import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Auth from '../../Component/Auth';
import { fetchAppVersionAction } from '../../Actions/util';

import {
    selectIsLoading, selectVersion, selectError
} from '../../Selectors/util';

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsLoading(),
    appVersion: selectVersion(),
    error: selectError()
})

const mapDispatchToProps = {
    fetchAppVersion: fetchAppVersionAction

};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);