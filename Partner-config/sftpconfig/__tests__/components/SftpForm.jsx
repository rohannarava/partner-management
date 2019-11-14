import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import { mountWithIntl } from 'enzyme-react-intl'
import { shallow } from 'enzyme'
import sftpReducer from '../../reducer'
import SftpForm, { SFTPForm } from '../../components/SftpForm'

const handleSubmit = jest.fn()
const initialState = {
  form: null,
  loading: false,
  configs: [],
  totalCount: 0,
}

const initialProps = {
  initialValues: {
    id: '19fb410f-ef15-4089-a96a-27de27eb1cac',
    name: 'TEST_2',
    userName: 'localhost_sftp',
    host: 'host_tester',
    password: 'test',
    isDefault: true,
    sftpSource: 'my_own_sftp',
    confirmPassword: 'test',
    port: 22,
  },
  onSubmit: jest.fn(),
  intl: { formatMessage: jest.fn() },
  handleSubmit: jest.fn(),
}
const store = createStore(
  combineReducers({
    form: formReducer,
    sftp: sftpReducer,
  }),
  initialState
)

const router = {
  createHref: () => {},
  push: jest.fn(),
  replace: () => {},
  go: () => {},
  goBack: () => {},
  goForward: () => {},
  setRouteLeaveHook: () => {},
  isActive: () => {},
  location: {
    pathname: '/admin/sftp/',
  },
}
describe('<SftpForm />', () => {
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <SftpForm router={router} {...initialProps} onSubmit={handleSubmit} />
    </Provider>
  )
  const selectField = wrapper.find('select')

  it('should contain edit form', () => {
    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find('.title').text()).toBe('Update Configuration')
  })

  it('should contain one select field', () => {
    expect(selectField).toHaveLength(1)
  })

  it('should contain options', () => {
    expect(selectField).toHaveLength(1)
    expect(
      selectField
        .find('option')
        .at(1)
        .text()
    ).toBe('My Own SFTP')
    expect(
      selectField
        .find('option')
        .at(2)
        .text()
    ).toBe('Skillsoft SFTP')
  })

  it('should contain input fields', () => {
    expect(wrapper.find('input')).toHaveLength(7)
  })

  it('should have initial value for Name Field', () => {
    expect(wrapper.find('TextField[name="name"]').prop('value')).toBe(
      initialProps.initialValues.name
    )
  })

  it('should have initial value for Host Field', () => {
    expect(wrapper.find('TextField[name="host"]').prop('value')).toBe(
      initialProps.initialValues.host
    )
  })

  it('should have initial value for user name Field', () => {
    expect(wrapper.find('TextField[name="userName"]').prop('value')).toBe(
      initialProps.initialValues.userName
    )
  })

  it('should have initial value for port Field', () => {
    expect(wrapper.find('TextField[name="port"]').prop('value')).toBe(
      initialProps.initialValues.port
    )
  })

  it('should have initial value for password Field', () => {
    expect(wrapper.find('TextField[name="password"]').prop('value')).toBe(
      initialProps.initialValues.password
    )
  })

  it('should have initial value for confirmPassword Field', () => {
    expect(
      wrapper.find('TextField[name="confirmPassword"]').prop('value')
    ).toBe(initialProps.initialValues.confirmPassword)
  })

  it('should have initial value for default Field', () => {
    expect(wrapper.find('Checkbox[name="isDefault"]').prop('value')).toBe(
      initialProps.initialValues.isDefault
    )
  })

  it('should have label Update for the button', () => {
    expect(wrapper.find('input[type="checkbox"]')).toHaveLength(1)
  })

  it('should have a cancel button and should not be disabled', () => {
    expect(wrapper.find('Button[label="Cancel"]')).toHaveLength(1)
    expect(wrapper.find('Button[label="Cancel"]').props().disabled).toBeFalsy()
  })

  it('should have label Update for the button', () => {
    expect(wrapper.find('button[type="submit"]').text()).toBe('Update')
  })

  it('should have label Cancel for the button', () => {
    expect(wrapper.find('button[type="button"]').text()).toBe('Cancel')
  })

  it('onSubmit called on Button click', () => {
    const button = wrapper.find('button[type="submit"]')
    expect(button.props.onClick).toBe(wrapper.instance().onSubmit)
  })

  it('should call onCancel on clicking Cancel button', () => {
    const cancelButton = wrapper.find('button[type="button"]')
    cancelButton.simulate('click')
    expect(wrapper.props().children.props.router.push).toHaveBeenCalledWith(
      '/admin/sftp'
    )
  })

  it('should have 6 fields on selecting skillsoft_sftp', () => {
    selectField.simulate('change', { target: { value: 'skillsoft_sftp' } })
    expect(wrapper.find('input')).toHaveLength(6)
  })

  it('should have 7 fields on selecting my_own_sftp', () => {
    selectField.simulate('change', { target: { value: 'my_own_sftp' } })
    expect(wrapper.find('input')).toHaveLength(7)
  })

  it('should not show the host field on selecting skillsoft_sftp', () => {
    selectField.simulate('change', { target: { value: 'skillsoft_sftp' } })
    expect(wrapper.find('TextField[name="host"]')).toHaveLength(0)
  })

  it('should show the host field on selecting my_own_sftp', () => {
    selectField.simulate('change', { target: { value: 'my_own_sftp' } })
    expect(wrapper.find('TextField[name="host"]')).toHaveLength(1)
  })
})

describe('SFTP View', () => {
  const viewRouter = {
    push: jest.fn(),
    location: {
      pathname: '/admin/sftp/19fb410f-ef15-4089-a96a-27de27eb1cac/view',
    },
  }
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <SftpForm
        router={viewRouter}
        {...initialProps}
        onSubmit={handleSubmit}
        onDelete={handleSubmit}
      />
    </Provider>
  )

  const dropDown = wrapper.find('select')

  it('should contain view form', () => {
    expect(wrapper.find('form')).toHaveLength(1)
    expect(wrapper.find('.title').text()).toBe(initialProps.initialValues.name)
  })

  it('should contain one dropDown field', () => {
    expect(dropDown).toHaveLength(1)
  })

  it('should contain options in the dropDown', () => {
    expect(dropDown).toHaveLength(1)
    expect(
      dropDown
        .find('option')
        .at(1)
        .text()
    ).toBe('My Own SFTP')
    expect(
      dropDown
        .find('option')
        .at(2)
        .text()
    ).toBe('Skillsoft SFTP')
  })

  it('should contain 4 fields', () => {
    expect(wrapper.find('input')).toHaveLength(5)
  })

  it('should have value for Name Field', () => {
    expect(wrapper.find('TextField[name="name"]').prop('value')).toBe(
      initialProps.initialValues.name
    )
  })

  it('should have value for Host Field', () => {
    expect(wrapper.find('TextField[name="host"]').prop('value')).toBe(
      initialProps.initialValues.host
    )
  })

  it('should have value for user name Field', () => {
    expect(wrapper.find('TextField[name="userName"]').prop('value')).toBe(
      initialProps.initialValues.userName
    )
  })

  it('should have value for password Field', () => {
    expect(wrapper.find('TextField[name="password"]').prop('value')).toBe(
      initialProps.initialValues.password
    )
  })

  it('should have label Delete this configuration for the button and should not be disabled', () => {
    expect(
      wrapper.find('Button[label="Delete this configuration"]')
    ).toHaveLength(1)
    expect(
      wrapper.find('Button[label="Delete this configuration"]').props().disabled
    ).toBeFalsy()
  })

  it('should have a cancel button and should not be disabled', () => {
    expect(wrapper.find('Button[label="Cancel"]')).toHaveLength(1)
    expect(wrapper.find('Button[label="Cancel"]').props().disabled).toBeFalsy()
  })

  it('should have label Delete this configuration for the button', () => {
    expect(
      wrapper
        .find('button[type="button"]')
        .at(0)
        .text()
    ).toBe('Delete this configuration')
  })

  it('should have label Cancel for the button', () => {
    expect(
      wrapper
        .find('button[type="button"]')
        .at(1)
        .text()
    ).toBe('Cancel')
  })

  it('should route to /admin/sftp on clicking Cancel button', () => {
    const cancelButton = wrapper.find('Button[label="Cancel"]')
    cancelButton.simulate('click')
    expect(wrapper.props().children.props.router.push).toHaveBeenCalledWith(
      '/admin/sftp'
    )
  })

  it('should have ConfirmModal', () => {
    const confirmModal = wrapper.find('ConfirmModal')
    expect(confirmModal).toHaveLength(1)
  })

  it('should open ConfirmModal on clicking the button', () => {
    wrapper
      .find('Button[label="Delete this configuration"]')
      .at(0)
      .simulate('click')
    expect(wrapper.find('ConfirmModal').prop('isOpen')).toBe(true)
  })

  it('should have the buttons for ConfirmModal', () => {
    const confirmModal = wrapper.find('ConfirmModal')
    expect(
      confirmModal
        .find('Button')
        .at(0)
        .props().label
    ).toContain('Yes')
    expect(
      confirmModal
        .find('Button')
        .at(1)
        .props().label
    ).toContain('Cancel')
  })

  it('should have the buttons for ConfirmModal', () => {
    const confirmModal = wrapper.find('ConfirmModal')
    expect(
      confirmModal
        .find('Button')
        .at(0)
        .props().label
    ).toContain('Yes')
    expect(
      confirmModal
        .find('Button')
        .at(1)
        .props().label
    ).toContain('Cancel')
  })

  it('onDelete called on Button click', () => {
    const confirmModal = wrapper.find('ConfirmModal')
    const button = confirmModal.find('Button').at(0)
    expect(button.props.onClick).toBe(wrapper.instance().onDelete)
  })

  it('should route to /admin/sftp on clicking Cancel button on ConfirmModal', () => {
    const confirmModal = wrapper.find('ConfirmModal')
    const button = confirmModal.find('Button').at(1)
    button.simulate('click')
    expect(wrapper.props().children.props.router.push).toHaveBeenCalledWith(
      '/admin/sftp'
    )
  })

  it('should open the ConfirmModal on click of the button for default configuration', () => {
    wrapper
      .find('Button[label="Delete this configuration"]')
      .at(0)
      .simulate('click')
    expect(wrapper.find('ConfirmModal').prop('isOpen')).toBe(true)
    expect(wrapper.find('InjectIntl(ConfirmModal)').length).toBe(1)
    expect(
      wrapper.find('ConfirmModal').props().content.props.defaultMessage
    ).toContain(
      'You are deleting the default config. The existing schedules for this configuration will be failed. Do you want to confirm?'
    )
  })

  it('should call onSubmit when submitEditForm is called', () => {
    initialProps.showHostOnLoad = false
    const sftpWrapper = shallow(
      <SFTPForm router={router} {...initialProps} onSubmit={handleSubmit} />
    )
    initialProps.showHostOnLoad = true
    sftpWrapper.instance().componentWillReceiveProps(initialProps)
  })
})
