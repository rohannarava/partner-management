import React from 'react'
import { shallow } from 'enzyme'
import { mount } from '../../../../common/enzymeHelper/enzymeHelper'
import SFTPCreateForm, { SftpCreateForm } from '../../components/SftpCreateForm'

const initialState = {
  sftp: {
    form: null,
    loading: false,
    configs: [],
    totalCount: 0,
  },
}
const router = {
  createHref: () => {},
  push: jest.fn(),
  replace: () => {},
  go: () => {},
  goBack: () => {},
  goForward: () => {},
  setRouteLeaveHook: () => {},
  isActive: () => {},
}
const handleSubmit = jest.fn()
const initialProps = {
  loading: false,
  onSubmit: jest.fn(),
  router,
}

describe('<SftpCreateForm />', () => {
  const sftpCreateFormwrapper = (props, state = initialState) =>
    mount(<SFTPCreateForm {...props} />, {
      state,
      onSubmit: { handleSubmit },
      router,
      intl: true,
    })

  const wrapper = sftpCreateFormwrapper(initialProps)
  const authField = wrapper.find('select').at(0)
  const sourceField = wrapper.find('select').at(1)

  it('should contain create configuration form', () => {
    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find('.title').text()).toBe('Create Configuration')
  })

  it('should contain input fields', () => {
    expect(wrapper.find('input')).toHaveLength(7)
  })

  it('should contain authField field', () => {
    expect(authField).toHaveLength(1)
  })

  it('should contain label for authField field', () => {
    const authFieldLabel = wrapper.find('SelectField').at(0)
    expect(authFieldLabel.find('label').text()).toContain('Authentication')
  })

  it('authField should contain options', () => {
    expect(authField).toHaveLength(1)
    expect(
      authField
        .find('option')
        .at(0)
        .text()
    ).toBe('Basic Authentication')
    expect(
      authField
        .find('option')
        .at(1)
        .text()
    ).toBe('PKI Authentication')
  })

  it('should contain sourceField field', () => {
    expect(sourceField).toHaveLength(1)
  })

  it('should contain label for sourceField field', () => {
    const sourceFieldLabel = wrapper.find('SelectField').at(1)
    expect(sourceFieldLabel.find('label').text()).toContain('Source')
  })

  it('sourceField should contain options', () => {
    expect(sourceField).toHaveLength(1)
    expect(
      sourceField
        .find('option')
        .at(0)
        .text()
    ).toBe('My Own SFTP')
    expect(
      sourceField
        .find('option')
        .at(1)
        .text()
    ).toBe('Skillsoft SFTP')
  })

  it('should have a submit button and should not be disabled', () => {
    expect(wrapper.find('button[type="submit"]')).toHaveLength(1)
    expect(wrapper.find('button[type="submit"]').props().disabled).toBeFalsy()
  })

  it('should have Name Field', () => {
    expect(wrapper.find('TextField[name="name"]')).toHaveLength(1)
  })

  it('should have Host Field', () => {
    expect(wrapper.find('TextField[name="host"]')).toHaveLength(1)
  })

  it('should have port Field', () => {
    expect(wrapper.find('TextField[name="port"]')).toHaveLength(1)
  })

  it('should have user name Field', () => {
    expect(wrapper.find('TextField[name="userName"]')).toHaveLength(1)
  })

  it('should have password Field', () => {
    expect(wrapper.find('TextField[name="password"]')).toHaveLength(1)
  })

  it('should have confirmPassword Field', () => {
    expect(wrapper.find('TextField[name="confirmPassword"]')).toHaveLength(1)
  })

  it('should have default Field', () => {
    expect(wrapper.find('Checkbox[name="isDefault"]')).toHaveLength(1)
  })

  it('should have checkbox for default Field', () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1)
  })

  it('should have label Create', () => {
    expect(wrapper.find('button[type="submit"]').text()).toContain('Create')
  })

  it('should have label Cancel for the button', () => {
    expect(wrapper.find('button[type="button"]').text()).toContain('Cancel')
  })

  it('should have a cancel button and should not be disabled', () => {
    expect(wrapper.find('Button[label="Cancel"]')).toHaveLength(1)
    expect(wrapper.find('Button[label="Cancel"]').props().disabled).toBeFalsy()
  })

  it('onSubmit called on Button click', () => {
    const button = wrapper.find('button[type="submit"]')
    expect(button.props.onClick).toBe(wrapper.instance().onSubmit)
  })

  it('should call onCancel on clicking Cancel button', () => {
    const cancelButton = wrapper.find('button[type="button"]')
    cancelButton.simulate('click')
    expect(wrapper.props().router.push).toHaveBeenCalledWith('/admin/sftp')
  })

  it('should have 6 fields on selecting basic_auth', () => {
    authField.simulate('change', { target: { value: 'basic_auth' } })
    expect(wrapper.find('input')).toHaveLength(7)
  })

  it('should have 5 fields on selecting pki_auth', () => {
    authField.simulate('change', { target: { value: 'pki_auth' } })
    expect(wrapper.find('input')).toHaveLength(6)
  })

  it('should have 5 fields on selecting my_own_sftp', () => {
    sourceField.simulate('change', { target: { value: 'my_own_sftp' } })
    expect(wrapper.find('input')).toHaveLength(6)
  })

  it('should have 4 fields on selecting skillsoft_sftp', () => {
    sourceField.simulate('change', { target: { value: 'skillsoft_sftp' } })
    expect(wrapper.find('input')).toHaveLength(5)
  })

  it('should not show the host field on selecting skillsoft_sftp', () => {
    sourceField.simulate('change', { target: { value: 'skillsoft_sftp' } })
    expect(wrapper.find('TextField[name="host"]')).toHaveLength(0)
  })

  it('should show the host field on selecting my_own_sftp', () => {
    sourceField.simulate('change', { target: { value: 'my_own_sftp' } })
    expect(wrapper.find('TextField[name="host"]')).toHaveLength(1)
  })

  it('should call handleSubmit on click of submit button', () => {
    const submitButton = wrapper.find('Button[type="submit"]')
    expect(submitButton.props.onClick).toBe(wrapper.instance().handleSubmit)
  })

  it('should call handleSubmit on click of submit button', () => {
    initialProps.intl = { formatMessage: jest.fn() }
    initialProps.handleSubmit = jest.fn()
    initialProps.onSubmit = jest.fn()

    const sftpWrapper = shallow(
      <SftpCreateForm
        router={router}
        {...initialProps}
        onSubmit={handleSubmit}
      />
    )
    jest.spyOn(sftpWrapper.instance(), 'onSubmitNewForm')
    jest
      .spyOn(sftpWrapper.instance().props, 'onSubmit')
      .mockImplementation(() => Promise.resolve())

    sftpWrapper.instance().onSubmitNewForm({}, jest.fn())
  })
})
