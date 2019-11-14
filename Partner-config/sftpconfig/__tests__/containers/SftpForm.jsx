import React from 'react'
import { mount } from '../../../../common/enzymeHelper/enzymeHelper'
import SftpFormContainer from '../../containers/SftpForm'

const initialState = {
  sftp: {
    form: null,
    loading: false,
    configs: [],
    totalCount: 0,
  },
}

const initialProps = {
  loading: false,
  params: { id: '17fb410f-ef15-4089-a96a-27de27eb1cac' },
  fetchSftpConfigData: () => {},
  onConfirm: () => {},
}

describe('<SftpFormContainer />', () => {
  const sftpFormwrapper = (props, state = initialState) =>
    mount(<SftpFormContainer {...props} />, {
      state,
      router: {
        location: {
          pathname: '/admin/sftp/17fb410f-ef15-4089-a96a-27de27eb1cac/view',
        },
        params: { id: '17fb410f-ef15-4089-a96a-27de27eb1cac' },
      },
      intl: true,
    })

  const wrapper = sftpFormwrapper(initialProps)

  it('should have SftpFormContainer', () => {
    expect(wrapper.find('SftpFormContainer')).toHaveLength(1)
  })

  it('should have a PageContainer', () => {
    expect(wrapper.find('PageContainer')).toHaveLength(1)
  })

  it('should contain buttons in the PageContainer', () => {
    expect(
      wrapper
        .find('PageContainer')
        .find('Button[label="Settings"]')
        .text()
    ).toContain('Settings')
  })

  it('should go to /admin/sftp on clicking Settings button', () => {
    const settingsButton = wrapper
      .find('PageContainer')
      .find('Button[label="Settings"]')
    expect(settingsButton.props().to).toContain('/admin/sftp')
  })

  it('should contain form', () => {
    expect(wrapper.find('Form')).toHaveLength(1)
  })

  it('should go to /admin/sftp on clicking Settings button', () => {
    expect(
      wrapper
        .find('PageContainer')
        .find('h1')
        .text()
    ).toContain('SFTP Server Configuration')
  })

  it('should contain SFTPForm', () => {
    expect(wrapper.find('InjectIntl(SFTPForm)')).toHaveLength(1)
  })

  it('should show loading', () => {
    expect(wrapper.find('SftpFormContainer').props().loading).toBe(false)
  })

  it('should have loading prop to be true in SFTPForm', () => {
    expect(wrapper.find('InjectIntl(SFTPForm)')).toHaveLength(1)
    expect(wrapper.find('InjectIntl(SFTPForm)').prop('loading')).toBeFalsy()
  })

  it('should have Loading in SFTPForm', () => {
    const loadingEle = wrapper.find('InjectIntl(SFTPForm)').find('Loading')
    expect(loadingEle).toHaveLength(1)
  })

  it('should contain fetchSftpConfigData method', () => {
    const instance = wrapper.find('SftpFormContainer').instance()
    expect(typeof instance.props.fetchSftpConfigData).toBe('function')
  })

  it('should contain onConfirm method', () => {
    const instance = wrapper.find('SftpFormContainer').instance()
    expect(typeof instance.props.onConfirm).toBe('function')
  })
})
