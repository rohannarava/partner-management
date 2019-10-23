import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import Paper from '@skillsoft/ui/lib/Paper'
import Button from '@skillsoft/ui/lib/Button'
import Loading from '@skillsoft/ui/lib/Loading'
import { injectIntl } from 'react-intl'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import mergePropsForReduxFormDecorator, { reduxFormId } from './formConfig'
import Form from '../../../common/Form'
import messages from '../messages'
import getSftpViewsPath from '../paths'
// import {
//   Accordion,
//   AccordionItem,
//   AccordionItemHeading,
//   AccordionItemPanel,
// } from 'react-accessible-accordion'
import styles from './SftpForm.css'

const statusProvider = [
  {
    name: 'Select',
    id: '',
  },
  {
    name: 'Active',
    id: 'Active',
  },
  {
    name: 'Inactive',
    id: 'Inactive',
  },
]

const businessRelationshipProvider = [
  {
    name: 'Select',
    id: '',
  },
  {
    name: 'Aggregation',
    id: 'Aggregation',
  },
  {
    name: 'Integration',
    id: 'Integration',
  },
  {
    name: 'Partnership',
    id: 'Partnership',
  },
  {
    name: 'Reseller',
    id: 'Reseller',
  },
]

const businessModelProvider = [
  {
    name: 'Select',
    id: '',
  },
  {
    name: 'Collection-Driven',
    id: 'Collection-Driven',
  },
  {
    name: 'Usage-Driven',
    id: 'Usage-Driven',
  },
]

const contentRightsProvider = [
  {
    name: 'Select',
    id: '',
  },
  {
    name: 'Org Specific',
    id: 'OrgSpecific',
  },
  {
    name: 'Non-Org Specific',
    id: 'NonOrgSpecific',
  },
]

const dataStorageRegionProvider = [
  {
    name: 'Select',
    id: '',
  },
  {
    name: 'US',
    id: 'US',
  },
  {
    name: 'EU',
    id: 'EU',
  },
]

// const myOwnSftp = [
//   {
//     name: 'My Own SFTP',
//     id: 'my_own_sftp',
//   },
//   {
//     name: 'Skillsoft SFTP',
//     id: 'skillsoft_sftp',
//   },
// ]
// const authSourceSftp = [
//   {
//     name: 'Basic Authentication',
//     id: 'basic_auth',
//   },
//   {
//     name: 'PKI Authentication',
//     id: 'pki_auth',
//   },
// ]

const statusOptions = statusProvider.map(({ name: label, id: value }) => ({
  label,
  value,
}))
const businessRelationshipOptions = businessRelationshipProvider.map(
  ({ name: label, id: value }) => ({
    label,
    value,
  })
)
const businessModelOptions = businessModelProvider.map(
  ({ name: label, id: value }) => ({
    label,
    value,
  })
)
const contentRightOptions = contentRightsProvider.map(
  ({ name: label, id: value }) => ({
    label,
    value,
  })
)
const dataStorageRegionOptions = dataStorageRegionProvider.map(
  ({ name: label, id: value }) => ({
    label,
    value,
  })
)
// const options = myOwnSftp.map(obj => ({
//   label: obj.name,
//   value: obj.id,
// }))
// const authOptions = authSourceSftp.map(({ name: label, id: value }) => ({
//   label,
//   value,
// }))

const headerStrip = <div />

export class SftpCreateForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showHost: true,
      showPassword: true,
      showPrivateKey: false,
    }
  }

  onCancel = () => {
    const { router } = this.props
    router.push(getSftpViewsPath('sftp'))
  }

  onSubmitNewForm = (values, dispatch) =>
    this.props.onSubmit(values, dispatch).then(() => {
      this.props.router.push(getSftpViewsPath('sftp'))
      return null
    })

  // onChange = ({ target: { value } }) => {
  //   if (value === myOwnSftp[1].id) {
  //     this.setState({ showHost: false })
  //   } else {
  //     this.setState({ showHost: true })
  //   }
  // }

  // onChangeAuth = ({ target: { value } }) => {
  //   if (value === authSourceSftp[1].id) {
  //     this.setState({ showPassword: false, showPrivateKey: true })
  //   } else {
  //     this.setState({ showPrivateKey: false, showPassword: true })
  //   }
  // }

  render() {
    const {
      intl: { formatMessage },
      loading,
      error,
      handleSubmit,
      invalid,
      submitFailed,
      submitting,
      formFields,
    } = this.props

    // const { showHost, showPassword, showPrivateKey } = this.state
    const ownSftp = {
      headerStrip,
      content: (
        <div>
          {/* <Field {...formFields.providerId} /> */}
          <Field {...formFields.vendorName} />
          <Field {...formFields.displayName} />
          <Field {...formFields.logo} />
          <Field
            {...formFields.status}
            options={statusOptions}
            // onChange={this.onChangeStatus}
          />
          <Field
            {...formFields.businessRelationship}
            options={businessRelationshipOptions}
          />
          <Field {...formFields.businessModel} options={businessModelOptions} />
          {/* <Field {...formFields.contentRights} options={contentRightOptions} /> */}
          <Field
            {...formFields.dataStorageRegion}
            options={dataStorageRegionOptions}
          />
          {/* <Field
            {...formFields.contactDetails}
          />
          <Field
            {...formFields.contractDetails}
          /> */}

          {/* <Field
            {...formFields.authSource}
            options={authOptions}
            onChange={this.onChangeAuth}
          /> */}
          {/* <Field
            {...formFields.sftpSource}
            options={options}
            onChange={this.onChange}
          />
          <Field {...formFields.name} />
          {showHost && <Field {...formFields.host} />}
          <Field {...formFields.port} />
          <Field {...formFields.userName} />
          {showPassword && <Field {...formFields.password} />}
          {showPassword && <Field {...formFields.confirmPassword} />}
          {showPrivateKey && <Field {...formFields.privateKey} />}
          <Field {...formFields.isDefault} /> */}
        </div>
      ),
    }

    const actionBar = (
      <div>
        <Button
          kind="primary"
          id="sftpCreate"
          label={formatMessage(messages.create)}
          type="submit"
          disabled={invalid || submitting}
          cogaAction="submit"
        />
        <Button
          kind="secondary"
          id="sftpCancel"
          label={formatMessage(messages.cancel)}
          onClick={this.onCancel}
          cogaAction="cancel"
        />
      </div>
    )

    return (
      <Loading withLogo loading={loading}>
        <Paper>
          <Paper>
            <Tabs>
              <div className={styles.tabContainer}>
                <div className={styles.tabListWrapper}>
                  <TabList>
                    <Tab> Basic Details </Tab>
                    <Tab> Engineering Details </Tab>
                    <Tab> Org Mapping </Tab>
                  </TabList>
                </div>
                <div className={styles.tabPanelWrapper}>
                  <TabPanel index={0} className={styles.tabPanel}>
                    <Form
                      onSubmit={handleSubmit(this.onSubmitNewForm)}
                      fieldsets={[ownSftp]}
                      actionBar={actionBar}
                      error={(submitFailed || invalid) && error}
                    />
                  </TabPanel>
                </div>
              </div>
              <TabPanel index={1}>
                {/* <Accordion>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                What harsh truths do you prefer to ignore?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                Exercitation in fugiat est ut ad ea cupidatat ut in
                                cupidatat occaecat ut occaecat consequat est minim minim
                                esse tempor laborum consequat esse adipisicing eu
                                reprehenderit enim.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                    <AccordionItem>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                Is free will real or just an illusion?
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <p>
                                In ad velit in ex nostrud dolore cupidatat consectetur
                                ea in ut nostrud velit in irure cillum tempor laboris
                                sed adipisicing eu esse duis nulla non.
                            </p>
                        </AccordionItemPanel>
                    </AccordionItem>
                </Accordion> */}
              </TabPanel>
              <TabPanel index={2}> </TabPanel>
            </Tabs>
          </Paper>
        </Paper>
      </Loading>
    )
  }
}

SftpCreateForm.defaultProps = {
  loading: false,
  formFields: {},
  error: null,
  submitFailed: false,
  submitting: false,
}

SftpCreateForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.node,
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  invalid: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool,
  submitting: PropTypes.bool,
  formFields: PropTypes.objectOf(PropTypes.object),
  dispatch: PropTypes.func.isRequired,
}

export default compose(
  connect(mergePropsForReduxFormDecorator),
  reduxForm({
    form: reduxFormId,
    // initialValues: {
    //   authSource: authSourceSftp[0].id,
    //   sftpSource: myOwnSftp[0].id,
    // },
  }),
  injectIntl
)(SftpCreateForm)
