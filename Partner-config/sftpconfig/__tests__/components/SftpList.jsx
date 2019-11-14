import React from 'react'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import { mountWithIntl, shallowWithIntl } from 'enzyme-react-intl'
import { mount } from '../../../../common/enzymeHelper/enzymeHelper'
import sftpReducer from '../../reducer'
import SftpList from '../../components/SftpList'

const columns = [
  {
    name: 'name',
    sortable: true,
    label: 'NAME',
  },
  {
    name: 'default',
    maxWidth: '15%',
    label: 'Default',
  },
  {
    name: 'id',
    sortable: false,
    label: 'CONFIGURATION ID',
  },
  {
    name: 'createdAt',
    sortable: true,
    label: 'CREATED DATE',
  },
  {
    name: 'actions',
    sortable: false,
    label: 'ACTIONS',
  },
]

const props = {
  columns,
  loading: false,
  configs: [
    {
      createdAt: '10/5/2018',
      host: 'localhost_sftp',
      id: 'bb37b4fa-7aa8-4f24-a8e4-c6a51a8ad264',
      isDefault: true,
      name: 'localhost_sftp-test',
      password: 'test',
      username: 'localhost_sftp',
    },
    {
      createdAt: '10/23/2018',
      host: 'localhost_sftp1',
      id: 'cb8c1b26-9b7b-44aa-9827-eac3c9ab700a',
      isDefault: false,
      name: 'localhost_sftp-test1',
      password: 'test',
      username: 'localhost_sftp1',
    },
    {
      createdAt: '11/14/2018',
      host: 'localhost_sftp2',
      id: 'cb8c1b26-9b7b-44aa-9827-eac3c9ab700a',
      isDefault: false,
      name: 'localhost_sftp-test2',
      password: 'test',
      username: 'localhost_sftp2',
    },
    {
      createdAt: '11/28/2018',
      host: 'localhost_sftp3',
      id: 'cb8c1b26-9b7b-44aa-9827-eac3c9ab700a',
      isDefault: false,
      name: 'localhost_sftp-test3',
      password: 'test',
      username: 'localhost_sftp3',
    },
  ],
  totalCount: 4,
  onConfirm: () => {},
}

const initialState = {}

const store = createStore(
  combineReducers({
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
}

describe('<SftpList />', () => {
  const wrapper = mountWithIntl(
    <Provider store={store}>
      <SftpList router={router} {...props} loading={false} />
    </Provider>
  )
  const formattedTableContainer = wrapper.find('FormattedTableContainer')
  it('has a FeaturedTable', () => {
    expect(formattedTableContainer).toHaveLength(1)
  })

  it('has totalCount four', () => {
    expect(formattedTableContainer.prop('totalCount')).toBe(4)
  })
  it('renders a pagination', () => {
    expect(wrapper.find('nav').length).toBe(1)
  })
  it('renders a table with correct number of columns', () => {
    const tableHeaders = wrapper.find('TableHeader')
    expect(tableHeaders.length).toBe(columns.length)
  })
  it('renders a table with correct number of rows', () => {
    const tableHeaders = wrapper.find('tbody tr')
    expect(tableHeaders.length).toBe(props.configs.length)
  })
  it('renders a table with correct data', () => {
    wrapper.setProps({ hasRowHeader: true })
    wrapper.update()
    const table = wrapper.find('table')
    const rows = table.find('tbody').find('tr')
    const firstRowThs = rows.at(0).find('th')
    const firstRowTds = rows.at(0).find('td')
    const defaultRadioButton = firstRowTds.at(1).find('input')
    const defaultLabel = firstRowTds.at(1).find('label')
    expect(defaultRadioButton.length).toBe(1)
    expect(defaultLabel.length).toBe(1)
    expect(rows.length).toBe(4)
    expect(firstRowThs.length).toBe(0)
    expect(firstRowTds.length).toBe(5)
    expect(firstRowTds.at(0).text()).toBe(props.configs[0].name)
    expect(firstRowTds.at(2).text()).toBe(props.configs[0].id)
    expect(firstRowTds.at(3).text()).toBe(props.configs[0].createdAt)
  })
  it('does not render a pagination', () => {
    wrapper.setProps({ pagination: false })
    expect(wrapper.find('nav[role="navigation"]').length).toBe(0)
  })

  it('should have ActionMenu', () => {
    const actionMenu = wrapper.find('ActionMenu')
    expect(actionMenu).toHaveLength(4)
  })

  it('ActionMenu should contain the toggle menu button', () => {
    const actionMenu = wrapper.find('ActionMenu')
    const actionButtons = actionMenu.find('Button')
    expect(actionButtons).toHaveLength(4)
  })

  it('should call the router on click of the button', () => {
    const table = wrapper.find('table')
    const rows = table.find('tbody').find('tr')
    const firstRowTds = rows.at(0).find('td')
    const firstRowBtn = firstRowTds.find('Button')
    firstRowBtn.simulate('click')
    const button = wrapper.find('ActionMenu').find('button')

    button.at(1).simulate('click')
    expect(wrapper.props().children.props.router.push).toHaveBeenCalled()

    const secondRowTds = rows.at(0).find('td')
    const secondRowBtn = secondRowTds.find('Button')
    secondRowBtn.simulate('click')
    button.at(2).simulate('click')
    expect(wrapper.props().children.props.router.push).toHaveBeenCalled()

    const thirdRowTds = rows.at(0).find('td')
    const thirdRowBtn = thirdRowTds.find('Button')
    thirdRowBtn.simulate('click')
    button.at(3).simulate('click')

    expect(wrapper.props().children.props.router.push).toHaveBeenCalled()
  })

  it('should have the title for ConfirmModal', () => {
    expect(wrapper.find('ConfirmModal').props().title).toContain(
      'Delete Configuration'
    )
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

  it('should open the ConfirmModal on click of the button for default configuration', () => {
    const table = wrapper.find('table')
    const rows = table.find('tbody').find('tr')
    const button = wrapper.find('ActionMenu').find('button')
    const rowTds = rows.at(1).find('td')
    const thirdRowBtn = rowTds.find('Button')
    thirdRowBtn.simulate('click')

    button.at(3).simulate('click')
    expect(wrapper.find('InjectIntl(ConfirmModal)').prop('isOpen')).toBeTruthy()
    expect(wrapper.find('InjectIntl(ConfirmModal)').length).toBe(1)
    expect(
      wrapper.find('ConfirmModal').props().content.props.defaultMessage
    ).toContain(
      'You are deleting the default config. The existing schedules for this configuration will be failed. Do you want to confirm?'
    )
  })

  it('should open the ConfirmModal on click of the button', () => {
    const table = wrapper.find('table')
    const rows = table.find('tbody').find('tr')
    const button = wrapper.find('ActionMenu').find('button')
    const thirdRowTds = rows.at(0).find('td')
    const thirdRowBtn = thirdRowTds.find('Button')
    thirdRowBtn.simulate('click')

    button.at(3).simulate('click')

    expect(wrapper.find('InjectIntl(ConfirmModal)').prop('isOpen')).toBeTruthy()
    expect(wrapper.find('InjectIntl(ConfirmModal)').length).toBe(1)
  })

  it('should call the router on change of the default radio button', () => {
    const table = wrapper.find('table')
    const rows = table.find('tbody').find('tr')
    const firstRowTds = rows.at(0).find('td')
    const firstRadioBtn = firstRowTds.find('input')
    firstRadioBtn.simulate('change')
    expect(wrapper.props().children.props.router.push).toHaveBeenCalled()
    expect(wrapper.find('ConfirmModal').props().title).toContain(
      'Update Default Configuration'
    )
  })

  it('should have the buttons for ConfirmModal on default change', () => {
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

  it('should open the ConfirmModal on change of the default', () => {
    const table = wrapper.find('table')
    const rows = table.find('tbody').find('tr')
    const firstRowTds = rows.at(0).find('td')
    const firstRadioBtn = firstRowTds.find('input')
    firstRadioBtn.simulate('change')

    expect(wrapper.find('InjectIntl(ConfirmModal)').prop('isOpen')).toBeTruthy()
    expect(wrapper.find('InjectIntl(ConfirmModal)').length).toBe(1)
  })
})

describe('createMenuItem', () => {
  const commonAttrs = {
    kind: 'actionmenu',
    size: null,
    showLabel: true,
  }
  const sftpWrapper = shallowWithIntl(
    <SftpList router={router} {...props} loading={false} />
  )

  const instance = sftpWrapper
    .dive()
    .dive()
    .instance()

  it('should return the object on calling createMenuItem func for Edit', async () => {
    const expectedEditObj = {
      ...commonAttrs,
      id: 'Edit',
      label: 'Edit',
      onClick: () => {},
      cogaAction: 'edit',
    }

    expect(
      JSON.stringify(instance.createMenuItem(props.configs[0], 'edit'))
    ).toEqual(JSON.stringify(expectedEditObj))
  })

  it('should return the object on calling createMenuItem func for View', async () => {
    const expectedViewObj = {
      ...commonAttrs,
      id: 'View',
      label: 'View',
      onClick: () => {},
      cogaAction: 'view',
    }

    expect(
      JSON.stringify(instance.createMenuItem(props.configs[0], 'view'))
    ).toEqual(JSON.stringify(expectedViewObj))
  })

  it('should return the object on calling setStateOnDefaultChange', async () => {
    const defaultConfigs = instance.state.defaultConfigs
    instance.setStateOnDefaultChange(null, defaultConfigs[0])
    expect(instance.state.defaultConfigs[0].isDefault).toBe(true)
  })
})

describe('show Toast', () => {
  const intlProps = {
    intl: {
      formatDate: () => {},
      formatTime: () => {},
      formatRelative: () => {},
      formatNumber: () => {},
      formatPlural: () => {},
      formatMessage: () => {},
      formatHTMLMessage: () => {},
      now: () => {},
    },
  }
  const wrapper = mount(
    <SftpList router={router} {...props} {...intlProps} loading={false} />,
    {
      intl: true,
    }
  )

  it('should show deletion toast', async () => {
    expect(wrapper.find('Toast')).toHaveLength(0)
    wrapper.setState({ showToast: true })
    expect(wrapper.state('showToast')).toBe(true)
    wrapper.setProps({ deleteSuccess: true })
    wrapper.setProps({ deletedItemName: 'Test' })
    expect(wrapper.find('Toast')).toHaveLength(1)
    expect(wrapper.find('Toast').props().type).toEqual('success')
    expect(wrapper.find('Toast').props().animate).toEqual('from-left')
    expect(wrapper.find('Toast').props().shadow).toEqual(true)
  })

  it('should show updation toast', async () => {
    wrapper.setState({ showToast: true })
    expect(wrapper.state('showToast')).toBe(true)
    wrapper.setProps({ updateSuccess: true })
    wrapper.setProps({ updatedItemName: 'UpdateTest' })
    expect(wrapper.find('Toast')).toHaveLength(1)
    expect(wrapper.find('Toast').props().type).toEqual('success')
    expect(wrapper.find('Toast').props().animate).toEqual('from-left')
    expect(wrapper.find('Toast').props().shadow).toEqual(true)
  })

  it('should show creation toast', async () => {
    wrapper.setState({ showToast: true })
    expect(wrapper.state('showToast')).toBe(true)
    wrapper.setProps({ createSuccess: true })
    wrapper.setProps({ createdItemName: 'Test' })
    expect(wrapper.find('Toast')).toHaveLength(1)
    expect(wrapper.find('Toast').props().type).toEqual('success')
    expect(wrapper.find('Toast').props().animate).toEqual('from-left')
    expect(wrapper.find('Toast').props().shadow).toEqual(true)
  })
})
