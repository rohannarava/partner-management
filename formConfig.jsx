import React from 'react'
import { FormattedMessage } from 'react-intl'
import {
  renderTextField,
  renderSelectField,
  renderCheckboxField,
} from '../../../common/Form/render'
import { renderKeyUploadInput } from './KeyUpload'
import validator from '../../helpers/validator'
import messages from '../messages'

export const reduxFormId = 'sftp_settings'
export const UPLOAD_MAX_SIZE = 100 * 1024

export const parseFileAttributes = file => {
  const r = new FileReader()
  r.onload = e => {
    const fileObj = e.target.result
    const bufferArray = new Uint8Array(fileObj)
    // eslint-disable-next-line no-param-reassign
    file.buffer = String.fromCharCode.apply(null, bufferArray)
  }
  r.readAsArrayBuffer(file)
}

export const formFields = {
  providerId: {
    component: renderTextField,
    id: `${reduxFormId}-providerId`,
    key: `${reduxFormId}-providerId`,
    name: 'providerId',
    label: <FormattedMessage {...messages.providerId} />,
    required: true,
  },
  partnerName: {
    component: renderTextField,
    id: `${reduxFormId}-partnerName`,
    key: `${reduxFormId}-partnerName`,
    name: 'partnerName',
    label: <FormattedMessage {...messages.partnerName} />,
    required: true,
  },
  partnerDisplayName: {
    component: renderTextField,
    id: `${reduxFormId}-partnerDisplayName`,
    key: `${reduxFormId}-partnerDisplayName`,
    name: 'partnerDisplayName',
    label: <FormattedMessage {...messages.partnerDisplayName} />,
    required: true,
  },
  partnerLogo: {
    component: renderTextField,
    id: `${reduxFormId}-partnerLogo`,
    key: `${reduxFormId}-partnerLogo`,
    name: 'partnerLogo',
    label: <FormattedMessage {...messages.partnerLogo} />,
    required: true,
  },
  vendor: {
    component: renderTextField,
    id: `${reduxFormId}-vendor`,
    key: `${reduxFormId}-vendor`,
    name: 'vendor',
    label: <FormattedMessage {...messages.vendor} />,
    required: true,
  },
  contentScope: {
    component: renderSelectField,
    id: `${reduxFormId}-contentScope`,
    key: `${reduxFormId}-contentScope`,
    name: 'contentScope',
    label: <FormattedMessage {...messages.contentScope} />,
    required: true,
  },
  curationPermission: {
    component: renderSelectField,
    id: `${reduxFormId}-curationPermission`,
    key: `${reduxFormId}-curationPermission`,
    name: 'curationPermission',
    label: <FormattedMessage {...messages.curationPermission} />,
    required: true,
  },
  launchSource: {
    component: renderSelectField,
    id: `${reduxFormId}-launchSource`,
    key: `${reduxFormId}-launchSource`,
    name: 'launchSource',
    label: <FormattedMessage {...messages.launchSource} />,
    required: true,
  },
  launchTarget: {
    component: renderSelectField,
    id: `${reduxFormId}-launchTarget`,
    key: `${reduxFormId}-launchTarget`,
    name: 'launchTarget',
    label: <FormattedMessage {...messages.launchTarget} />,
    required: true,
  },
  trackingMethod: {
    component: renderSelectField,
    id: `${reduxFormId}-trackingMethod`,
    key: `${reduxFormId}-trackingMethod`,
    name: 'trackingMethod',
    label: <FormattedMessage {...messages.trackingMethod} />,
    required: true,
  },
  status: {
    component: renderSelectField,
    id: `${reduxFormId}-status`,
    key: `${reduxFormId}-status`,
    name: 'status',
    label: <FormattedMessage {...messages.status} />,
    required: true,
  },
  businessRelationship: {
    component: renderSelectField,
    id: `${reduxFormId}-businessRelationship`,
    key: `${reduxFormId}-businessRelationship`,
    name: 'businessRelationship',
    label: <FormattedMessage {...messages.businessRelationship} />,
    required: true,
  },
  businessModel: {
    component: renderSelectField,
    id: `${reduxFormId}-businessModel`,
    key: `${reduxFormId}-businessModel`,
    name: 'businessModel',
    label: <FormattedMessage {...messages.businessModel} />,
    required: true,
  },
  contentRights: {
    component: renderSelectField,
    id: `${reduxFormId}-contentRights`,
    key: `${reduxFormId}-contentRights`,
    name: 'contentRights',
    label: <FormattedMessage {...messages.contentRights} />,
    required: true,
  },
  contactDetails: {
    component: renderTextField,
    id: `${reduxFormId}-contactDetails`,
    key: `${reduxFormId}-contactDetails`,
    name: 'contactDetails',
    label: <FormattedMessage {...messages.contactDetails} />,
    required: true,
  },
  dataStorageRegion: {
    component: renderSelectField,
    id: `${reduxFormId}-dataStorageRegion`,
    key: `${reduxFormId}-dataStorageRegion`,
    name: 'dataStorageRegion',
    label: <FormattedMessage {...messages.dataStorageRegion} />,
    required: true,
  },
  contractDetails: {
    component: renderTextField,
    id: `${reduxFormId}-contractDetails`,
    key: `${reduxFormId}-contractDetails`,
    name: 'contractDetails',
    label: <FormattedMessage {...messages.contractDetails} />,
    required: true,
  },
  authSource: {
    component: renderSelectField,
    id: `${reduxFormId}-authSource`,
    key: `${reduxFormId}-authSource`,
    name: 'authSource',
    label: <FormattedMessage {...messages.authentication} />,
    required: true,
  },
  sftpSource: {
    component: renderSelectField,
    id: `${reduxFormId}-sftpSource`,
    key: `${reduxFormId}-sftpSource`,
    name: 'sftpSource',
    label: <FormattedMessage {...messages.source} />,
    required: true,
  },
  name: {
    component: renderTextField,
    id: `${reduxFormId}-name`,
    key: `${reduxFormId}-name`,
    name: 'name',
    label: <FormattedMessage {...messages.name} />,
    required: true,
  },
  host: {
    id: `${reduxFormId}-host`,
    key: `${reduxFormId}-host`,
    type: 'text',
    label: <FormattedMessage {...messages.host} />,
    name: 'host',
    component: renderTextField,
    required: true,
  },
  port: {
    id: `${reduxFormId}-port`,
    key: `${reduxFormId}-port`,
    type: 'text',
    label: <FormattedMessage {...messages.port} />,
    name: 'port',
    component: renderTextField,
    required: false,
  },
  userName: {
    id: `${reduxFormId}-userName`,
    key: `${reduxFormId}-userName`,
    type: 'text',
    label: <FormattedMessage {...messages.userName} />,
    name: 'userName',
    component: renderTextField,
    required: true,
  },
  password: {
    id: `${reduxFormId}-password`,
    key: `${reduxFormId}-password`,
    type: 'password',
    label: <FormattedMessage {...messages.password} />,
    name: 'password',
    component: renderTextField,
    required: true,
  },
  confirmPassword: {
    id: `${reduxFormId}-confirmPassword`,
    key: `${reduxFormId}-confirmPassword`,
    type: 'password',
    label: <FormattedMessage {...messages.confirmPassword} />,
    name: 'confirmPassword',
    component: renderTextField,
    required: true,
  },
  privateKey: {
    id: `${reduxFormId}-privateKey`,
    key: `${reduxFormId}-privateKey`,
    type: 'file',
    label: <FormattedMessage {...messages.privateKey} />,
    name: 'privateKey',
    component: renderKeyUploadInput,
    required: true,
  },
  isDefault: {
    component: renderCheckboxField,
    id: `${reduxFormId}-isDefault`,
    key: `${reduxFormId}-isDefault`,
    name: 'isDefault',
    normalize: value => value || false,
    label: <FormattedMessage {...messages.isDefault} />,
  },
}

const mergePropsForReduxFormDecorator = (dispatchProps, ownProps) => {
  const validateFile = ({ size, name }, errors) => {
    if (size > UPLOAD_MAX_SIZE) {
      // eslint-disable-next-line no-param-reassign
      errors.privateKey = <FormattedMessage {...messages.fileTooBigError} />
      return
    }
    if (size === 0) {
      // eslint-disable-next-line no-param-reassign
      errors.privateKey = <FormattedMessage {...messages.invalidfileError} />
      return
    }

    if (!name.endsWith('.txt')) {
      // eslint-disable-next-line no-param-reassign
      errors.privateKey = <FormattedMessage {...messages.filenameError} />
    }
  }

  const validate = validator(formFields, (initialErrors, values) => {
    const errors = { ...initialErrors }
    const {
      password,
      confirmPassword,
      sftpSource,
      userName,
      host,
      name,
      privateKey,
      port,
    } = values

    if (password !== confirmPassword) {
      errors.confirmPassword = (
        <FormattedMessage {...messages.passwordMismatch} />
      )
    }
    if (sftpSource === undefined || sftpSource === 'select') {
      errors.sftpSource = <FormattedMessage {...messages.sftpSourceError} />
    }
    if (name && name.length < 2) {
      errors.name = <FormattedMessage {...messages.lengthError} />
    }
    if (host && host.length < 2) {
      errors.host = <FormattedMessage {...messages.lengthError} />
    }
    if (userName && userName.length < 2) {
      errors.userName = <FormattedMessage {...messages.lengthError} />
    }
    if (
      port !== undefined &&
      port !== null &&
      port !== '' &&
      Number.isNaN(parseInt(port, 10))
    ) {
      errors.port = <FormattedMessage {...messages.portTypeError} />
    } else if (port && (port < 0 || port > 65535)) {
      errors.port = <FormattedMessage {...messages.portError} />
    }

    if (password && password.length < 2) {
      errors.password = <FormattedMessage {...messages.lengthError} />
    }
    if (privateKey) {
      validateFile(privateKey[0], errors)
      parseFileAttributes(privateKey[0])
    }
    return errors
  })

  return {
    ...dispatchProps,
    ...ownProps,
    form: reduxFormId,
    formFields,
    validate,
  }
}

export default mergePropsForReduxFormDecorator
