import { takeLatest } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import * as api from './api'
import { takeRequestToApi } from '../../common/sagas'

export function* deleteSftpConfig({ payload: partnerId }) {
  try {
    yield call(api.deleteSftpConfig, partnerId)
    yield put({
      type: 'SFTP_CONFIG_DELETE_SUCCEEDED',
      payload: partnerId,
    })
  } catch (error) {
    yield put({
      type: 'SFTP_CONFIG_DELETE_FAILED',
      payload: { id, error },
    })
  }
}

export default function* sagas() {
  yield [
    call(takeLatest, 'SFTP_CONFIG_DELETE_REQUESTED', deleteSftpConfig),
    takeRequestToApi('SFTP_CONFIG_LIST_FETCH', api.fetchSftpConfigList),
    takeRequestToApi('SFTP_CONFIG_FETCH', api.fetchSftpConfig),
    takeRequestToApi('SFTP_CONFIG_UPDATE', api.udpateSftpConfig, {
      form: true,
    }),
    takeRequestToApi('SFTP_CONFIG_CREATE', api.createSftpConfig, {
      form: true,
    }),
  ]
}
