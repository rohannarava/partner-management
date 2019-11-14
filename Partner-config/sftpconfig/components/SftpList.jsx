import React from 'react'
import PropTypes from 'prop-types'
//import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { injectIntl, FormattedMessage } from 'react-intl'
import { compose } from 'recompose'
import Loading from '@skillsoft/ui/lib/Loading'
import Paper from '@skillsoft/ui/lib/Paper'
import Toast from '@skillsoft/ui/lib/Toast'
import Link from '@skillsoft/ui/lib/Link'
import ConfirmModal from '@skillsoft/ui/lib/ConfirmModal'
import ActionMenu from '@skillsoft/ui/lib/ActionMenu'
import EllipsizedText from '@skillsoft/ui/lib/EllipsizedText'
import EmptyList from '../../serviceAccounts/components/EmptyList'
//import FormattedTableContainerV3 from '../../../common/containers/FormattedTableContainer/FormattedTableContainerV3'
import FormattedTableContainer, {
  columnShape,
} from '../../../common/containers/FormattedTableContainer'
import styles from './SftpForm.css'
import getSftpViewsPath from '../paths'
import messages from '../messages'

const commonAttrs = {
  kind: 'actionmenu',
  size: null,
  showLabel: true,
}

const setActionMenuPosition = (menuButton, menuWrapper) => {
  const menuWrapperParent = menuWrapper.parentElement
  const btnRectangle = menuButton.buttonRef.getBoundingClientRect()
  const table = menuButton.buttonRef.closest('table')
  const tableRectangle = table.getBoundingClientRect()
  const menuRectangle = menuWrapperParent.getBoundingClientRect()
  if (tableRectangle.height < menuRectangle.height) {
    table.style.height = `${menuRectangle.height * 1.15}px`
  }
  if (tableRectangle.bottom - btnRectangle.bottom < menuRectangle.height) {
    let top =
      tableRectangle.bottom -
      btnRectangle.bottom -
      menuRectangle.height +
      btnRectangle.height / 2
    if (tableRectangle.height < menuRectangle.height) {
      top *= 0.5
    }
    menuWrapperParent.style.top = `${top}px`
  }
}

class SftpList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmModal: false,
      modalTitle: null,
      modalContent: null,
      onConfirmation: () => {},
      showToast: true,
      defaultConfigs: props.configs,
    }
  }

  createMenuItem(row, type) {
    return {
      ...commonAttrs,
      id: this.props.intl.formatMessage(messages[`${type}Label`]),
      label: this.props.intl.formatMessage(messages[`${type}Label`]),
      onClick:
        type === 'delete'
          ? () =>
              this.handleOpenConfirmModal(
                type,
                'SFTP_CONFIG_DELETE_REQUESTED',
                row
              )
          : () =>
              this.props.router.push(
                getSftpViewsPath(type, row.partnerId)
              ),
      cogaAction: type,
    }
  }

  handleOpenConfirmModal = (type, action, row, event) => {
    let modelType = type
    const modalTitle = this.props.intl.formatMessage(
      messages[`${modelType}TitleConfirm`]
    )
    // if (modelType && row && modelType === 'delete') {
    //   modelType = 'deleteDefaultConfig'
    // }
    const modalContent = (
      <FormattedMessage
        {...messages[`${modelType}Confirm`]}
        values={{ name: row.partnerName }}
      />
    )

    const onConfirmation = () => {
      this.props.onConfirm(action, row)
      if (modelType && modelType === 'updateDefault') {
        this.setStateOnDefaultChange(event, row)
      } else {
        this.setState({ showConfirmModal: false, showToast: true })
      }
    }

    this.setState({
      onConfirmation,
      modalTitle,
      modalContent,
      showConfirmModal: true,
    })
  }

  handleCloseConfirmModal = () => {
    this.setState({ showConfirmModal: false })
  }

  // defaultField = row => (
  //   <div className={styles.slide}>
  //     <input
  //       type="radio"
  //       id={`slide-${row.partnerName}`}
  //       name={row.name}
  //       onChange={event =>
  //         this.handleOpenConfirmModal(
  //           'updateDefault',
  //           'SFTP_CONFIG_UPDATE_REQUESTED',
  //           row,
  //           event
  //         )
  //       }
  //       checked={row.isDefault}
  //     />
  //     <label htmlFor={`slide-${row.partnerName}`} />
  //   </div>
  // )

  removeToast = () => {
    this.setState({ showToast: false })
  }

  showToastMessage = (type, name) => (
    <div className={styles.sftpCommonToast}>
      <Toast
        animate="from-left"
        shadow
        type="success"
        onRemove={this.removeToast}
      >
        <FormattedMessage
          {...messages[`${type}ToastConfirm`]}
          values={{ name }}
        />
      </Toast>
    </div>
  )

  render() {
    const {
      intl,
      columns,
      totalCount,
      loading,
      deleteSuccess,
      deletedConfigName,
      updateSuccess,
      updatedConfigName,
      createSuccess,
      createdConfigName,
    } = this.props

    const {
      showConfirmModal,
      modalTitle,
      modalContent,
      onConfirmation,
      defaultConfigs,
    } = this.state

    const sftpListWithActions = defaultConfigs.map(row => {
      const columnNameField = {}
      columnNameField.name = (
        <span>
          <Link
            to={getSftpViewsPath('view', row.partnerId)}
            type="focus"
            tabIndex="0"
          >
            {row.partnerName}
          </Link>
        </span>
      )

      const actionsButtons = [
        this.createMenuItem(row, 'edit'),
        this.createMenuItem(row, 'view'),
        //this.createMenuItem(row, 'delete'),
      ]
      const defaultDisplay = 'NA'

      return {
        ...row,
        name: EllipsizedText(columnNameField.name),
        activeSince: row.ActiveSince
          ? intl.formatDate(row.ActiveSince)
          : defaultDisplay,
        content: row.ContentIngestion
          ? EllipsizedText(row.ContentIngestion)
          : defaultDisplay,
        tracking: row.Tracking ? EllipsizedText(row.Tracking) : defaultDisplay,
        launchMode: row.LaunchMode
          ? EllipsizedText(row.LaunchMode)
          : defaultDisplay,
        auth: row.AuthenticationMode
          ? EllipsizedText(row.AuthenticationMode)
          : defaultDisplay,
        actions: (
          <ActionMenu
            actionButtonSize="x-small"
            onUpdate={setActionMenuPosition}
            buttons={actionsButtons}
          />
        ),
      }
    })

    const content = totalCount ? (
      <FormattedTableContainer
        columns={columns}
        data={sftpListWithActions}
        totalCount={totalCount}
        userStyles={{ isFixedLayout: true }}
        pagination
      />
    ) : (
      <EmptyList
        emptyListTitle={messages.emptySftpTitle}
        emptyListCallToAction={messages.emptySftpCallToAction}
      />
    )

    let message
    const { showToast } = this.state
    if (showToast) {
      if (deleteSuccess) {
        message = this.showToastMessage('delete', deletedConfigName)
      } else if (updateSuccess && updatedConfigName) {
        message = this.showToastMessage('update', updatedConfigName)
      } else if (createSuccess) {
        message = this.showToastMessage('create', createdConfigName)
      }
    }
    return (
      <div>
        <Loading withLogo loading={loading}>
          <Paper>
            <div aria-live="polite">{content}</div>
            <ConfirmModal
              title={modalTitle}
              content={modalContent}
              onRequestClose={this.handleCloseConfirmModal}
              onConfirmation={onConfirmation}
              isOpen={showConfirmModal}
            />
          </Paper>
          {message}
        </Loading>
      </div>
    )
  }
}

SftpList.defaultProps = {
  loading: true,
  deleteSuccess: false,
  deletedConfigName: '',
  updateSuccess: false,
  updatedConfigName: '',
  createSuccess: false,
  createdConfigName: '',
}

SftpList.propTypes = {
  columns: PropTypes.arrayOf(columnShape).isRequired,
  configs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      createdAt: PropTypes.string,
    })
  ).isRequired,
  totalCount: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  deleteSuccess: PropTypes.bool,
  deletedConfigName: PropTypes.string,
  updateSuccess: PropTypes.bool,
  updatedConfigName: PropTypes.string,
  createSuccess: PropTypes.bool,
  createdConfigName: PropTypes.string,
}

export default compose(
  withRouter,
  injectIntl
)(SftpList)
