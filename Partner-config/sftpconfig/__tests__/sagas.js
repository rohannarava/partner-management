import testSaga from 'redux-saga-test-plan'
import * as api from '../api'
import sagas, { deleteSftpConfig } from '../sagas'
import {
  takeLatestMatching,
  expectApiRequested,
} from '../../../common/saga-test-helpers'

describe('Instance sagas', () => {
  it('SFTP_CONFIG_LIST_FETCH', () => {
    expectApiRequested(sagas, 'SFTP_CONFIG_LIST_FETCH', api.fetchSftpConfigList)
  })
  it('SFTP_CONFIG_FETCH', () => {
    expectApiRequested(sagas, 'SFTP_CONFIG_FETCH', api.fetchSftpConfig)
  })
  it('SFTP_CONFIG_UPDATE', () => {
    expectApiRequested(sagas, 'SFTP_CONFIG_UPDATE', api.udpateSftpConfig, {
      form: true,
    })
  })
  describe('delete SFTP configuration saga', () => {
    it('delete config workflow', () => {
      const id = 1
      const saga = testSaga(deleteSftpConfig, { payload: id })

      saga.next(api.deleteSftpConfig, id)

      // test error and back up
      const error = new Error('test')
      saga
        .throw(error)
        .put({
          type: 'SFTP_CONFIG_DELETE_FAILED',
          payload: { id, error },
        })
        .back()

      const result = { test: true }
      saga.next(result).put({
        type: 'SFTP_CONFIG_DELETE_SUCCEEDED',
        payload: id,
      })

      saga.next().isDone()
    })

    it('SFTP_CONFIG_DELETE_REQUESTED', () => {
      const saga = testSaga(sagas)
      saga.next().inspect(
        takeLatestMatching('SFTP_CONFIG_DELETE_REQUESTED', fn => {
          expect(fn).toBe(deleteSftpConfig)
        })
      )
    })
  })
  it('SFTP_CONFIG_CREATE', () => {
    expectApiRequested(sagas, 'SFTP_CONFIG_CREATE', api.createSftpConfig, {
      form: true,
    })
  })
})
