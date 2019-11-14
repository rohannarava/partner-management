import sftpReducer from '../reducer'

let initialState = {
  form: null,
  loading: false,
  configs: [],
  totalCount: 0,
  errors: [],
}

const configs = [
  {
    createdAt: '10/5/2018',
    host: 'localhost_sftp',
    id: 'bb37b4fa-7aa8-4f24-a8e4-c6a51a8ad264',
    isDefault: false,
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
]

const config = {
  id: 'da0b28f9-2e76-4bcf-9cf9-5f09b48eac0d',
  name: 'localhost_sftp',
  userName: 'localhost_sftp',
  host: 'localhost_sftp',
  isDefault: false,
  createdAt: '2019-01-03T10:20:28.279Z',
  updatedAt: '2019-01-03T10:20:28.279Z',
}

describe('sftpReducer', () => {
  beforeEach(() => {
    initialState = {
      configs: [],
      totalCount: 0,
    }
  })
  it('action==SFTP_CONFIG_LIST_FETCH_REQUESTED', () => {
    const action = { type: 'SFTP_CONFIG_LIST_FETCH_REQUESTED', payload: {} }
    const state = sftpReducer(initialState, action)
    expect(state.loading).toBe(true)
  })
  it('action==SFTP_CONFIG_LIST_FETCH_SUCCEEDED', () => {
    const action = {
      type: 'SFTP_CONFIG_LIST_FETCH_SUCCEEDED',
      payload: {
        data: configs,
        totalCount: 4,
      },
    }
    const state = sftpReducer(initialState, action)
    expect(state.configs).toEqual(action.payload.data)
    expect(state.totalCount).toEqual(action.payload.totalCount)
    expect(state.loading).toBe(false)
  })

  it('action==SFTP_CONFIG_DELETE', () => {
    const configurations = [
      {
        id: 'some id',
      },
      {
        id: 'someOtherId',
      },
    ]
    const idToDelete = 'someOtherId'
    const action = {
      type: 'SFTP_CONFIG_DELETE_SUCCEEDED',
      payload: idToDelete,
    }
    initialState.configs = configurations
    initialState.totalCount = 2
    const state = sftpReducer(initialState, action)
    expect(state.totalCount).toEqual(1)
  })
  it('action==SFTP_CONFIG_UPDATE', () => {
    const oldConfig = {
      id: 'same id',
      host: 'some host',
      name: 'some name',
    }
    const updatedConfig = {
      config: {
        data:
          '{"id": "same id","host": "different host","name": "different name"}',
      },
    }

    const action = {
      type: 'SFTP_CONFIG_UPDATE_SUCCEEDED',
      payload: updatedConfig,
    }
    initialState.configs.push(oldConfig)
    initialState.totalCount = 1
    const state = sftpReducer(initialState, action)
    expect(state.configs.length).toBe(1)
    expect(state.totalCount).toEqual(1)
  })
  it('action==SFTP_CONFIG_CREATE_SUCCEEDED', () => {
    const action = { type: 'SFTP_CONFIG_CREATE_SUCCEEDED', payload: { config } }
    const state = sftpReducer(initialState, action)
    initialState.configs.push(config)
    initialState.totalCount = 1
    expect(state.configs.length).toBe(1)
    expect(state.totalCount).toEqual(1)
  })
  it('action==SFTP_CONFIG_CREATE_FAILED', () => {
    const action = {
      type: 'SFTP_CONFIG_CREATE_FAILED',
      loading: false,
      message: 'failure',
    }
    const state = sftpReducer({}, action)
    expect(state.loading).toBe(false)
    expect(state.errors).toEqual(['failure'])
  })
  it('action==SFTP_CONFIG_FETCH_REQUESTED', () => {
    const action = {
      type: 'SFTP_CONFIG_FETCH_REQUESTED',
      payload: { id: config.id },
    }
    const state = sftpReducer(initialState, action)
    expect(state.loading).toBe(true)
  })
  it('action==SFTP_CONFIG_DELETE_REQUESTED', () => {
    const action = {
      type: 'SFTP_CONFIG_DELETE_REQUESTED',
      payload: { id: config.id },
    }
    const state = sftpReducer(initialState, action)
    expect(state.loading).toBe(true)
  })
  it('action==SFTP_CONFIG_UPDATE_REQUESTED', () => {
    const action = { type: 'SFTP_CONFIG_UPDATE_REQUESTED', payload: { config } }
    const state = sftpReducer(initialState, action)
    expect(state.loading).toBe(true)
  })
  it('action==SFTP_CONFIG_LIST_FETCH_FAILED', () => {
    const action = {
      type: 'SFTP_CONFIG_LIST_FETCH_FAILED',
      loading: false,
      message: 'failure',
    }
    const state = sftpReducer({}, action)
    expect(state.loading).toBe(false)
    expect(state.errors).toEqual(['failure'])
  })
})
