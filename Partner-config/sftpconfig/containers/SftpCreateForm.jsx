import React from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import PageContainer from '@skillsoft/ui/lib/PageContainer'
import { onSubmitActions } from '../../../common/Form/actions'
import messages from '../messages'
import SftpCreateForm from '../components/SftpCreateForm'
import getSftpViewsPath from '../paths'
import styles from '../components/SftpForm.css'

const onSubmit = onSubmitActions('SFTP_CONFIG_CREATE')

function SftpCreateFormContainer(props) {
  const {
    intl: { formatMessage },
  } = props
  const pageSettings = {
    headerLabels: [
      {
        label: formatMessage(messages.settings),
        to: getSftpViewsPath('sftp'),
      },
      {
        label: formatMessage(messages.pageTitle),
      },
    ],
    mainButtons: [],
  }

  return (
    <div className={styles.framed}>
      <PageContainer {...pageSettings}>
        <SftpCreateForm {...props} onSubmit={onSubmit} />
      </PageContainer>
    </div>
  )
}

const mapStateToProps = ({
  sftp: { loading, errors, configs, totalCount },
}) => ({
  loading,
  errors,
  configs,
  totalCount,
})

export default compose(
  withRouter,
  connect(mapStateToProps),
  injectIntl
)(SftpCreateFormContainer)
