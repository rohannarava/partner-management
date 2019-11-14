import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import PageContainer from '@skillsoft/ui/lib/PageContainer'
import { onSubmitActions } from '../../../common/Form/actions'
import messages from '../messages'
import SFTPForm from '../components/SftpForm'
import getSftpViewsPath from '../paths'
import styles from '../components/SftpForm.css'

const onSubmit = onSubmitActions('SFTP_CONFIG_UPDATE')
const onDelete = onSubmitActions('SFTP_CONFIG_DELETE')

class SftpFormContainer extends React.Component {
  componentDidMount() {
    const {
      params: { id },
    } = this.props
    this.props.fetchSftpConfigData(id)
  }

  componentDidUpdate(nextProps) {
    if (nextProps.params.id && nextProps.params.id !== this.props.params.id) {
      this.props.fetchSftpConfigData(this.props.params.id)
    }
  }

  render() {
    const { intl } = this.props
    const pageSettings = {
      headerLabels: [
        {
          label: intl.formatMessage(messages.settings),
          to: getSftpViewsPath('sftp'),
        },
        {
          label: intl.formatMessage(messages.pageTitle),
        },
      ],
      mainButtons: [],
    }

    return (
      <div className={styles.framed}>
        <PageContainer {...pageSettings}>
          <SFTPForm {...this.props} onSubmit={onSubmit} onDelete={onDelete} />
        </PageContainer>
      </div>
    )
  }
}
const mapStateToProps = ({
  sftp: { loading, form, fetchSuccess, showHostOnLoad },
}) => ({
  loading,
  initialValues: form,
  fetchSuccess,
  showHostOnLoad,
})

const mapDispatchToProps = dispatch => ({
  onConfirm: (type, payload) => dispatch({ type, payload }),
  fetchSftpConfigData(id) {
    dispatch({
      type: 'SFTP_CONFIG_FETCH_REQUESTED',
      payload: { id },
    })
  },
})

SftpFormContainer.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
  fetchSftpConfigData: PropTypes.func.isRequired,
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(SftpFormContainer)
