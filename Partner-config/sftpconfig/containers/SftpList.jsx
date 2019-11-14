import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl } from 'react-intl'
import { withRouter } from 'react-router'
import { compose } from 'recompose'
import PageContainer from '@skillsoft/ui/lib/PageContainer'
import AddCircle from '@skillsoft/ui/lib/icons/AddCircle'
import Loading from '@skillsoft/ui/lib/Loading'
import messages from '../messages'
import SftpList from '../components/SftpList'
import getSftpViewsPath from '../paths'

const columns = [
  {
    name: 'name',
    maxWidth: '20%',
    label: <FormattedMessage {...messages.displayLabel} />,
  },
  {
    name: 'content',
    maxWidth: '18%',
    label: <FormattedMessage {...messages.contentIn} />,
  },
  {
    name: 'auth',
    maxWidth: '17%',
    label: <FormattedMessage {...messages.authenticationMode} />,
  },
  {
    name: 'launchMode',
    maxWidth: '13%',
    label: <FormattedMessage {...messages.launchMode} />,
  },
  {
    name: 'tracking',
    maxWidth: '12%',
    label: <FormattedMessage {...messages.track} />,
  },
  {
    name: 'activeSince',
    maxWidth: '15%',
    label: <FormattedMessage {...messages.activeSince} />,
  },
  {
    name: 'actions',
    align: 'right',
    maxWidth: '10%',
    label: <FormattedMessage {...messages.actions} />,
  },
]

class SftpListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchSftpConfigListData(this.props)
  }

  // componentDidUpdate() {
  //   this.props.fetchSftpConfigListData(this.props)
  // }

  render() {
    const { intl } = this.props
    const pageSettings = {
      headerLabels: [
        {
          label: intl.formatMessage(messages.listPageTitle),
          to: getSftpViewsPath('sftp'),
        },
      ],
      mainButtons: [],
      headerButtons: [
        {
          label: intl.formatMessage(messages.addNewSftp),
          to: getSftpViewsPath('new'),
          cogaAction: 'new',
          ariaLabel: intl.formatMessage(messages.createSftpFormLabel),
          kind: 'primary',
          icon: AddCircle,
        },
      ],
    }
    return (
      <PageContainer {...pageSettings}>
        <Loading withLogo loading={this.props.loading}>
          <SftpList columns={columns} {...this.props} />
        </Loading>
      </PageContainer>
    )
  }
}

const mapStateToProps = ({ sftp }) => ({ ...sftp })

const mapDispatchToProps = dispatch => ({
  onConfirm: (type, payload) => dispatch({ type, payload }),
  fetchSftpConfigListData() {
    dispatch({
      type: 'SFTP_CONFIG_LIST_FETCH_REQUESTED',
    })
  },
})

SftpListContainer.defaultProps = {
  loading: true,
}

SftpListContainer.propTypes = {
  fetchSftpConfigListData: PropTypes.func.isRequired,
  loading: PropTypes.bool,
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(SftpListContainer)
