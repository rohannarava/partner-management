import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { createSftpConfig, udpateSftpConfig, deleteSftpConfig } from '../api'

const newSftpConfigData = {
  authSource: 'basic_auth',
  name: 'localhost_sftp-test',
  userName: 'localhost_sftp-test',
  host: 'localhost_sftp-test',
  password: 'test',
  isDefault: false,
  port: 22,
}

const configurations = [
  {
    host: 'localhost_sftp',
    id: 'bb37b4fa-7aa8-4f24-a8e4-c6a51a8ad264',
    isDefault: false,
    name: 'localhost_sftp-test',
    password: 'test',
    username: 'localhost_sftp',
    sftpSource: 'my_own_sftp',
    isSkillSoftSftp: true,
  },
  {
    host: 'localhost_sftp1',
    id: 'cb8c1b26-9b7b-44aa-9827-eac3c9ab700a',
    isDefault: true,
    name: 'localhost_sftp-test1',
    password: 'test',
    username: 'localhost_sftp1',
    sftpSource: 'my_own_sftp',
    isSkillSoftSftp: false,
  },
  {
    id: 'cb8c1b26-9b7b-44aa-9827-eac3c9ab700a',
    name: 'localhost_sftp-test1',
    host: 'localhost_sftp1',
    password: 'test',
    isDefault: true,
    isSkillSoftSftp: false,
  },
]

const mock = new MockAdapter(axios)
const data = { response: 'OK' }

describe('sftp api', () => {
  describe('create sftp', () => {
    // eslint-disable-next-line promise/catch-or-return
    it('create a new sftp configuration', done => {
      mock.onPost(`/admin/sftp`).reply(200, data)
      createSftpConfig(newSftpConfigData)
        .then(response => {
          expect(response).toEqual(data)
          return done()
        })
        .catch({})
    })

    it('update sftp', done => {
      mock.onPatch(`/admin/sftp`).reply(200, data)
      udpateSftpConfig(newSftpConfigData)
        .then(response => {
          expect(response.data).toEqual(data)
          return done()
        })
        .catch({})
    })

    it('delete sftp', done => {
      mock.onDelete(`/admin/sftp/${configurations[0].id}`).reply(200, data)
      deleteSftpConfig(configurations[0])
        .then(response => {
          expect(response).toEqual(data)
          return done()
        })
        .catch({})
    })
  })
})
