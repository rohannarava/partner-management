import { defineMessages } from 'react-intl'

const messages = defineMessages({
  settings: {
    id: 'SFTPForm.settings',
    description: 'SFTP form page root title',
    defaultMessage: 'Settings',
  },
  pageTitle: {
    id: 'SFTPForm.pageTitle',
    description: 'The title of the page for the SFTP form',
    defaultMessage: 'Partner Configuration',
  },
  editFormTitle: {
    id: 'SFTPForm.editFormTitle',
    description: 'The title for Edit Configuration Form',
    defaultMessage: 'Update Configuration',
  },
  providerId: {
    id: 'SFTPForm.providerId',
    description: 'Label text for Provider ID in SFTPForm',
    defaultMessage: 'Provider ID',
  },
  vendorName: {
    id: 'SFTPForm.vendorName',
    description: 'Label text for Vendor Name in SFTPForm',
    defaultMessage: 'Vendor Name',
  },
  displayName: {
    id: 'SFTPForm.displayName',
    description: 'Label text for Display Name in SFTPForm',
    defaultMessage: 'Display Name',
  },
  logo: {
    id: 'SFTPForm.logo',
    description: 'Label text for Logo in SFTPForm',
    defaultMessage: 'Logo',
  },
  browse: {
    id: 'SFTPForm.upload',
    description: 'Button to browse logo',
    defaultMessage: 'Browse',
  },
  status: {
    id: 'SFTPForm.status',
    description: 'Label text for Status in SFTPForm',
    defaultMessage: 'Status',
  },
  businessRelationship: {
    id: 'SFTPForm.businessRelationship',
    description: 'Label text for Business Relationship in SFTPForm',
    defaultMessage: 'Business Relationship',
  },
  businessModel: {
    id: 'SFTPForm.businessModel',
    description: 'Label text for Business Model in SFTPForm',
    defaultMessage: 'Business Model',
  },
  contentRights: {
    id: 'SFTPForm.contentRights',
    description: 'Label text for Content Rights in SFTPForm',
    defaultMessage: 'Content Rights',
  },
  contactDetails: {
    id: 'SFTPForm.contactDetails',
    description: 'Label text for Contact Details in SFTPForm',
    defaultMessage: 'Contact Details',
  },
  dataStorageRegion: {
    id: 'SFTPForm.dataStorageRegion',
    description: 'Label text for Data Storage Region in SFTPForm',
    defaultMessage: 'Data Storage Region',
  },
  contractDetails: {
    id: 'SFTPForm.contractDetails',
    description: 'Label text for Contract Details in SFTPForm',
    defaultMessage: 'Contract Details',
  },
  authentication: {
    id: 'SFTPForm.authentication',
    description: 'Label text for Authentication in SFTPForm',
    defaultMessage: 'Authentication',
  },
  source: {
    id: 'SFTPForm.source',
    defaultMessage: 'Source',
    description: 'Label text for sourse in SFTPForm',
  },
  name: {
    id: 'SFTPForm.name',
    defaultMessage: 'Name',
    description: 'Label text for name field in SFTPForm',
  },
  host: {
    id: 'SFTPForm.host',
    defaultMessage: 'Hostname',
    description: 'Label text for hostname in SFTPForm',
  },
  userName: {
    id: 'SFTPForm.username',
    defaultMessage: 'Username',
    description: 'Label text for username in SFTPForm',
  },
  password: {
    id: 'SFTPForm.password',
    defaultMessage: 'Password',
    description: 'Label text for password in SFTPForm',
  },
  isDefault: {
    id: 'SFTPForm.isDefault',
    description: 'Label for isDefault checkbox',
    defaultMessage: 'Default configuration',
  },
  updateConfig: {
    id: 'SFTPForm.updateConfig',
    defaultMessage: 'Update Configuration',
    description: 'Label text for update server configuration in SFTPForm',
  },
  cancel: {
    id: 'SFTPForm.cancel',
    description:
      'Button to cancel the Edit Configuration Form and return to the index',
    defaultMessage: 'Cancel',
  },
  save: {
    id: 'SFTPForm.save',
    defaultMessage: 'Update',
    description: 'Label text for save this in SFTPForm',
  },
  saved: {
    id: 'SFTPForm.saved',
    defaultMessage: 'Saved Configuration',
    description: 'Label text for saved configuration in SFTPForm',
  },
  successMessage: {
    id: 'SFTPForm.suceess',
    defaultMessage: 'SFTP configuration update successfully registered',
    description: 'Label text for success message in SFTPForm',
  },
  confirmPassword: {
    id: 'SFTPForm.confirmPassword',
    defaultMessage: 'Confirm Password',
    description: 'Label text for Confirm Password in SFTPForm',
  },
  passwordMismatch: {
    id: 'SFTPForm.mismatchPassword',
    defaultMessage: 'Confirm Password is not same as Password',
    description:
      'Label text for confirm password is not same as Password in SFTPForm',
  },
  sftpSourceError: {
    id: 'SFTPForm.sftpSourceError',
    defaultMessage: 'Source is mandatory',
    description: 'Label text for source is mandatory in SFTPForm',
  },
  delete: {
    id: 'SFTPForm.delete',
    defaultMessage: 'Delete this configuration',
    description: 'Label text for delete this config in SFTPForm',
  },
  edit: {
    id: 'SFTPForm.edit',
    defaultMessage: 'Edit this config',
    description: 'Label text to edit this config in SFTPform',
  },
  mandatoryMsg: {
    id: 'SFTPForm.mandatoryMsg',
    defaultMessage: 'All the fields are mandatory',
    description: 'Label text for all the fields are mandatory in SFTPForm',
  },
  defaultMsg: {
    id: 'SFTPForm.defaultMsg',
    defaultMessage: 'Default Configuration',
    description: 'Label text for default configuration in SFTPForm',
  },
  lengthError: {
    id: 'SFTPForm.lengthError',
    defaultMessage: 'Length should be minimum 2 characters',
    description: ' Label text for SFTP lengthError',
  },
  deleteConfirmTitle: {
    id: 'SFTPForm.confirmYesButton',
    defaultMessage: 'SFTP Delete',
    description: 'Label text for SFTP delete confirmation',
  },
  confirmDeleteMessage: {
    id: 'SFTPForm.confirmDeleteMessage',
    defaultMessage: 'Are you sure you want to delete this configuration?',
    description:
      'Label text of are you sure you want to delete this configuration',
  },
  /**
   * SftpList
   * */
  listPageTitle: {
    id: 'SftpList.listPageTitle',
    description: 'The title of the page for the SFTP Server Configurations',
    defaultMessage: 'SFTP Server Configurations',
  },
  displayLabel: {
    id: 'SftpList.displayLabel',
    description: 'Label for name column',
    defaultMessage: 'Name',
  },
  configId: {
    id: 'SftpList.configId',
    description: 'Label for Configuration ID column',
    defaultMessage: 'Configuration ID',
  },
  default: {
    id: 'SftpList.default',
    description: 'Label for default column',
    defaultMessage: 'Default',
  },
  createdAt: {
    id: 'SftpList.createdAt',
    description: 'Label for created date field',
    defaultMessage: 'Created Date',
  },
  actions: {
    id: 'SftpList.actions',
    description: 'Label for actions column',
    defaultMessage: 'Actions',
  },
  addNewSftp: {
    id: 'SftpList.addNewSftp',
    description: 'The label for New SFTP Configuration button and breadcrumb',
    defaultMessage: 'Add new SFTP Configuration',
  },
  emptySftpTitle: {
    id: 'SftpList.emptySftpTitle',
    description:
      'The title shown when there are no SFTP configurations matching the search',
    defaultMessage:
      'Oooops… It looks like there are no SFTP configurations here',
  },
  emptySftpCallToAction: {
    id: 'SftpList.emptySftpCallToAction',
    description:
      'The text shown when there are no SFTP configurations matching the search',
    defaultMessage: '.',
  },
  createSftpFormLabel: {
    id: 'SftpList.createSftpFormLabel',
    description: 'The text of the create new SFTP configuration form button',
    defaultMessage: 'Create new SFTP configuration form button',
  },
  viewLabel: {
    id: 'SftpList.viewLabel',
    description: 'Label text for the view SFTP configuration button',
    defaultMessage: 'View',
  },
  editLabel: {
    id: 'SftpList.editLabel',
    description: 'Label text for the edit SFTP configuration button',
    defaultMessage: 'Edit',
  },
  deleteLabel: {
    id: 'SftpList.deleteLabel',
    description: 'Label text for the delete SFTP configuration button',
    defaultMessage: 'Delete',
  },
  deleteTitleConfirm: {
    id: 'SftpList.deleteTitleConfirm',
    description:
      'Title of the modal to confirm you want to delete this configuration',
    defaultMessage: 'Delete Configuration',
  },
  deleteConfirm: {
    id: 'SftpList.deleteConfirm',
    description: 'The deletion confirmation dialog text',
    defaultMessage:
      'Are you sure you want to delete the "{name}" configuration? This action is not reversible.',
  },
  deleteDefaultConfigConfirm: {
    id: 'SftpList.deleteDefaultConfigConfirm',
    description:
      'The deletion of default configuration confirmation dialog text',
    defaultMessage:
      'You are deleting the default config. The existing schedules for this configuration will be failed. Do you want to confirm?',
  },
  updateDefaultTitleConfirm: {
    id: 'SftpList.updateDefaultTitleConfirm',
    description:
      'Title of the modal to confirm you want to update default for this configuration',
    defaultMessage: 'Update Default Configuration',
  },
  updateDefaultConfirm: {
    id: 'SftpList.updateDefaultConfirm',
    description: 'The update default confirmation dialog text',
    defaultMessage:
      'Are you sure you want to update the default value for "{name}" configuration?',
  },
  /**
   * Toast
   * */
  deleteToastConfirm: {
    id: 'SftpList.deleteToastConfirm',
    description: 'The toast confirmation for deletion',
    defaultMessage: '"{name}" has been successfully deleted',
  },
  updateToastConfirm: {
    id: 'SftpList.updateToastConfirm',
    description: 'The toast confirmation for updation',
    defaultMessage: '"{name}" has been successfully updated',
  },
  createToastConfirm: {
    id: 'SftpList.createToastConfirm',
    description: 'The toast confirmation for creation',
    defaultMessage: '"{name}" has been successfully created',
  },
  /**
   * SftpCreateForm
   * */
  createConfig: {
    id: 'SftpCreateForm.createConfig',
    defaultMessage: 'Create Configuration',
    description: 'Label text for create server configuration in SftpCreateForm',
  },
  create: {
    id: 'SftpCreateForm.create',
    defaultMessage: 'Create',
    description: 'Label text for create button in SftpCreateForm',
  },
  /**
   * PKI
   * */
  privateKey: {
    id: 'SftpCreateForm.privateKey',
    description: 'Label for Private Key field',
    defaultMessage: 'Private Key',
  },
  // browse: {
  //   id: 'KeyUpload.browse',
  //   description: 'browse button text',
  //   defaultMessage: 'Browse',
  // },
  required: {
    id: 'KeyUpload.fileIsRequired',
    description: 'Error message for missing field',
    defaultMessage: 'This field is required',
  },
  filenameError: {
    id: 'KeyUpload.filenameError',
    description: 'The text for when the uploading file is not a .txt',
    defaultMessage: 'Wrong file format. Please upload a .txt File',
  },
  fileTooBigError: {
    id: 'KeyUpload.fileTooBigError',
    description: 'File is too big',
    defaultMessage: 'File is too big, max 100Kb',
  },
  invalidfileError: {
    id: 'KeyUpload.invalidfileError',
    description: 'Invalid File',
    defaultMessage: 'Invalid File',
  },
  port: {
    id: 'SFTPForm.port',
    description: 'Port',
    defaultMessage: 'Port',
  },
  portError: {
    id: 'SFTPForm.portError',
    description: 'Port shoud be in the range of 0 to 65535',
    defaultMessage: 'Port shoud be in the range of 0 to 65535 ',
  },
  portTypeError: {
    id: 'SFTPForm.portTypeError',
    description: 'Port shoud be of type integer',
    defaultMessage: 'Port shoud be of type integer',
  },
})

export default messages
