import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import Loading from '@skillsoft/ui/lib/Loading'
import Button from '@skillsoft/ui/lib/Button'
import Paper from '@skillsoft/ui/lib/Paper'
import ConfirmModal from '@skillsoft/ui/lib/ConfirmModal'
import { reduxForm, Field, change } from 'redux-form'
import mergePropsForReduxFormDecorator, { reduxFormId } from './formConfig'
import SftpShape from '../shapes/SftpShape'
import styles from './SftpForm.css'
import Form from '../../../common/Form'
import messages from '../messages'
import getSftpViewsPath from '../paths'

const myOwnSftp = [
  {
    name: ' ',
    id: 'select',
  },
  {
    name: 'My Own SFTP',
    id: 'my_own_sftp',
  },
  {
    name: 'Skillsoft SFTP',
    id: 'skillsoft_sftp',
  },
]

const options = myOwnSftp.map(obj => ({
  label: obj.name,
  value: obj.id,
}))

const headerStrip = <div />

export class SFTPForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showHost: props.showHostOnLoad,
      showConfirmModal: false,
      modalTitle: null,
      modalContent: null,
      onConfirmation: () => {},
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.showHostOnLoad !== this.props.showHostOnLoad) {
      this.setState({ showHost: nextProps.showHostOnLoad })
    }
  }

  onCancel = () => {
    this.props.router.push(getSftpViewsPath('sftp'))
  }

  onSubmitEditForm = (values, dispatch) =>
    this.props.onSubmit(values, dispatch).then(() => {
      this.props.router.push(getSftpViewsPath('sftp'))
      return null
    })

  handleOpenConfirmModal = (type, action, initialValues) => {
    let modelType = type
    const modalTitle = this.props.intl.formatMessage(
      messages[`${modelType}TitleConfirm`]
    )
    if (
      modelType &&
      initialValues &&
      modelType === 'delete' &&
      initialValues.isDefault
    ) {
      modelType = 'deleteDefaultConfig'
    }
    const modalContent = (
      <FormattedMessage
        {...messages[`${modelType}Confirm`]}
        values={{ name: initialValues.name }}
      />
    )

    const onConfirmation = () => {
      const { onDelete, dispatch, router } = this.props
      return onDelete(initialValues, dispatch).then(() => {
        router.push(getSftpViewsPath('sftp'))
        return null
      })
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

  render() {
    const {
      intl: { formatMessage },
      handleSubmit,
      error,
      invalid,
      submitting,
      submitFailed,
      loading,
      formFields,
      initialValues,
      router,
    } = this.props

    const {
      showConfirmModal,
      modalTitle,
      modalContent,
      onConfirmation,
    } = this.state

    const { pathname } = router.location
    let isView = false

    if (pathname.includes('view')) {
      isView = true
    }

    const onChange = ({ target: { value } }) => {
      const { dispatch } = this.props
      Object.keys(formFields).forEach(key => {
        if (key === 'host') {
          dispatch(change(reduxFormId, key, ''))
        }
      })
      if (value === myOwnSftp[2].id) {
        this.setState({ showHost: false })
      } else {
        this.setState({ showHost: true })
      }
    }

    const title =
      isView && initialValues
        ? initialValues.name
        : formatMessage(messages.updateConfig)

    const requiredMsg = !isView ? formatMessage(messages.mandatoryMsg) : ''

    const subtitle =
      isView && initialValues && initialValues.isDefault
        ? formatMessage(messages.defaultMsg)
        : requiredMsg

    const ownSftp = {
      headerStrip,
      title,
      subtitle,
      content: (
        <div>
          {<Field {...formFields.providerId} disabled />}
          {<Field {...formFields.vendorName} disabled />}
          {<Field {...formFields.displayName} disabled />}
          {<Field {...formFields.logo} disabled />}
          {<Field {...formFields.status} disabled />}
          {<Field {...formFields.businessRelationship} disabled />}
          {<Field {...formFields.businessModel} disabled />}
          {<Field {...formFields.contentRights} disabled />}
          {<Field {...formFields.contactDetails} disabled />}
          {<Field {...formFields.dataStorageRegion} disabled />}
          {<Field {...formFields.contractDetails} disabled />}
          <Field
            {...formFields.sftpSource}
            options={options}
            onChange={onChange}
            disabled={isView}
          />
          {<Field {...formFields.name} disabled />}
          {this.state.showHost && (
            <Field {...formFields.host} disabled={isView} />
          )}
          <Field {...formFields.port} disabled={isView} />
          <Field {...formFields.userName} disabled={isView} />
          <Field {...formFields.password} disabled={isView} />
          {!isView && <Field {...formFields.confirmPassword} />}
          {!isView && <Field {...formFields.isDefault} />}
        </div>
      ),
    }

    const actionBar = (
      <div>
        {!isView && (
          <Button
            kind="primary"
            id="sftpSave"
            label={formatMessage(messages.save)}
            type="submit"
            disabled={invalid || submitting}
          />
        )}
        {isView && initialValues && (
          <Button
            kind="primary"
            id="sftpDelete"
            label={formatMessage(messages.delete)}
            onClick={() =>
              this.handleOpenConfirmModal(
                'delete',
                'SFTP_CONFIG_DELETE_REQUESTED',
                initialValues
              )
            }
          />
        )}
        <Button
          id="cancelBtn"
          kind="secondary"
          label={formatMessage(messages.cancel)}
          onClick={this.onCancel}
          cogaAction="cancel"
        />
      </div>
    )

    return (
      <div className={styles.framed}>
        <Loading withLogo loading={loading}>
          <Paper>
            <Form
              onSubmit={handleSubmit(this.onSubmitEditForm)}
              fieldsets={[ownSftp]}
              actionBar={[actionBar]}
              error={(submitFailed || invalid) && error}
            />
            <ConfirmModal
              title={modalTitle}
              content={modalContent}
              onRequestClose={this.handleCloseConfirmModal}
              onConfirmation={handleSubmit(onConfirmation)}
              isOpen={showConfirmModal}
            />
          </Paper>
        </Loading>
      </div>
    )
  }
}

SFTPForm.defaultProps = {
  error: null,
  formFields: {},
  initialValues: {},
  submitting: false,
  loading: false,
  submitFailed: false,
  invalid: false,
  showHostOnLoad: true,
}

SFTPForm.propTypes = {
  intl: intlShape.isRequired,
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool,
  error: PropTypes.node,
  submitting: PropTypes.bool,
  submitFailed: PropTypes.bool,
  showHostOnLoad: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formFields: PropTypes.objectOf(PropTypes.object),
  initialValues: PropTypes.shape(SftpShape),
  onDelete: PropTypes.func.isRequired,
}

export default compose(
  connect(mergePropsForReduxFormDecorator),
  reduxForm({
    enableReinitialize: true,
  }),
  injectIntl
)(SFTPForm)
