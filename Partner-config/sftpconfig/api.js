import axios from 'axios'

const SETTINGS_URL = 'admin/partner-management'

export async function fetchSftpConfigList(params) {
  const response = await axios(SETTINGS_URL, { params })
  // console.log('api response', response)
  return {
    data: response.data,
    totalCount: Number(
      response.headers['x-total-count'] || response.data.length
    ),
  }
}

export async function fetchSftpConfig({ id }) {
  const response = await axios(`${SETTINGS_URL}/${id}/edit`)
  //console.log('fetchSftpConfig', response.data)
  return response.data
}

export async function udpateSftpConfig(payload) {
  const response = await axios.patch(SETTINGS_URL, payload)
  return response
}

export async function deleteSftpConfig(payload) {
  const response = await axios.delete(`${SETTINGS_URL}/${payload.partnerId}`)
  return response.data
}

export async function createSftpConfig(payload) {
  const requestPayload = { ...payload }

  const { authSource, privateKey } = requestPayload

  if (authSource === 'pki_auth') {
    const { buffer } = privateKey[0]
    requestPayload.buffer = buffer
  }

  const response = await axios.post(SETTINGS_URL, { ...requestPayload })
  return response.data
}
