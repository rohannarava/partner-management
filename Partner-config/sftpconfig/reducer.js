const initialState = {
  form: null,
  loading: false,
  configs: [],
  totalCount: 0,
}
const successFlags = {
  deleteSuccess: false,
  updateSuccess: false,
  createSuccess: false,
}
export default (state = initialState, { type, payload, message }) => {
  switch (type) {
    case 'SFTP_CONFIG_LIST_FETCH_REQUESTED': {
      return {
        ...state,
        loading: true,
      }
    }
    case 'SFTP_CONFIG_LIST_FETCH_SUCCEEDED': {
      // console.log('payload', payload)
      return {
        ...state,
        loading: false,
        configs: payload.data,
        totalCount: payload.totalCount,
      }
    }
    case 'SFTP_CONFIG_LIST_FETCH_FAILED': {
      return {
        ...state,
        loading: false,
        ...successFlags,
        errors: [message],
      }
    }
    case 'SFTP_CONFIG_FETCH_REQUESTED': {
      return {
        ...state,
        loading: true,
        ...successFlags,
        error: false,
        form: null,
      }
    }
    case 'SFTP_CONFIG_FETCH_FAILED': {
      return {
        ...state,
        loading: false,
        error: message,
        fetchSuccess: false,
        ...successFlags,
        showDelete: false,
        showHostOnLoad: true,
      }
    }
    case 'SFTP_CONFIG_FETCH_SUCCEEDED': {
      const response = payload
      let showHost = true
      if (response.sftpSource === 'skillsoft_sftp') {
        showHost = false
      }
      response.confirmPassword = response.password
      return {
        ...state,
        form: payload,
        fetchSuccess: true,
        ...successFlags,
        loading: false,
        showDelete: true,
        showHostOnLoad: showHost,
      }
    }
    case 'SFTP_CONFIG_DELETE_REQUESTED': {
      return {
        ...state,
        loading: true,
        ...successFlags,
      }
    }
    case 'SFTP_CONFIG_DELETE_SUCCEEDED': {
      return {
        ...state,
        configs: state.configs.filter(({ partnerId }) => partnerId !== payload.partnerId),
        totalCount: state.totalCount - 1,
        loading: false,
        updateSuccess: false,
        createSuccess: false,
        deleteSuccess: true,
        deletedConfigName: payload.partnerName,
      }
    }
    case 'SFTP_CONFIG_CREATE_FAILED':
    case 'SFTP_CONFIG_UPDATE_FAILED':
    case 'SFTP_CONFIG_DELETE_FAILED': {
      return {
        ...state,
        loading: false,
        ...successFlags,
        errors: [message],
      }
    }
    case 'SFTP_CONFIG_CREATE_REQUESTED':
    case 'SFTP_CONFIG_UPDATE_REQUESTED': {
      return {
        ...state,
        loading: true,
        ...successFlags,
      }
    }
    case 'SFTP_CONFIG_UPDATE_SUCCEEDED': {
      const response = JSON.parse(payload.config.data)
      return {
        ...state,
        updateSuccess: true,
        loading: false,
        deleteSuccess: false,
        createSuccess: false,
        updatedConfigName: response.partnerName,
      }
    }
    case 'SFTP_CONFIG_CREATE_SUCCEEDED': {
      return {
        ...state,
        configs: [...state.configs, payload],
        totalCount: state.totalCount + 1,
        loading: false,
        deleteSuccess: false,
        updateSuccess: false,
        createSuccess: true,
        createdConfigName: payload.partnerName,
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}
