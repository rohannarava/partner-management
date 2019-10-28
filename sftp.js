import express from 'express'
import wrap from 'express-async-wrap'
import omitBy from 'lodash/omitBy'
import isNil from 'lodash/isNil'
import FormData from 'form-data'
import constants from '../../constants'

const {
  authConfigURL,
  authConfigBasicLogin,
  authConfigBasicPassword,
  partnerConfigURL,
  partnerConfigBasicLogin,
  partnerConfigBasicPassword,
} = constants

const router = express.Router()

const basicAuth = `Basic ${Buffer.from(
  `${authConfigBasicLogin}:${authConfigBasicPassword}`
).toString('base64')}`

const makeHeaders = (organizationId, userId) => ({
  'x-author-org-id': organizationId,
  'x-author-userid': userId,
  authorization: basicAuth,
})

const pkiHeaders = (organizationId, userId, formData) => ({
  'x-author-org-id': organizationId,
  'x-author-userid': userId,
  authorization: basicAuth,
  'content-type': `multipart/form-data; boundary=${formData.getBoundary()}`,
})

router.get(
  '/sftp',
  wrap(async (req, res) => {
    const { userId, organizationId } = req.meta
    const head = makeHeaders(organizationId, userId)
    console.log(req.query)
    const response = await req.axios(
      `${authConfigURL}/sftp/v2/organizations/${organizationId}/sftp-config`,
      {
        headers: head,
      }
    )
    res.json(response.data)
  })
)

router.get(
  '/sftp/:id/edit',
  wrap(async (req, res) => {
    const { userId, organizationId } = req.meta
    const head = makeHeaders(organizationId, userId)
    const response = await req.axios(
      `${partnerConfigURL}/sftp/v2/organizations/${organizationId}/sftp-config/${
        req.params.id
      }`,
      {
        headers: head,
      }
    )
    const { host, privateKey } = response.data
    if (host && host === constants.skillSoftSftp) {
      response.data.sftpSource = 'skillsoft_sftp'
    } else {
      response.data.sftpSource = 'my_own_sftp'
    }
    if (privateKey) {
      response.data.privateKey = ''
    }
    response.confirmPassword = response.password
    res.json(response.data)
  })
)

router.patch(
  '/sftp',
  wrap(async (req, res) => {
    const {
      id,
      name,
      userName,
      password,
      host,
      isDefault,
      sftpSource,
      confirmPassword,
      port,
    } = req.body
    const { userId, organizationId } = req.meta
    const hostName = sftpSource && sftpSource !== 'skillsoft_sftp' ? host : null

    const isSkillSoftSftpFlag =
      sftpSource && sftpSource === 'skillsoft_sftp' ? 'true' : 'false'

    let isSkillSoftSftp = false

    if (isSkillSoftSftpFlag === 'true') {
      isSkillSoftSftp = true
    }
    const portNo =
      port !== undefined && port !== null && port !== ''
        ? parseInt(port, 10)
        : 22

    let body = {
      id,
      name,
      host: hostName,
      userName,
      password,
      confirmPassword,
      isDefault,
      isSkillSoftSftp,
      port: portNo,
    }
    body = omitBy(body, isNil)
    const head = makeHeaders(organizationId, userId)
    let response = null
    if (password) {
      response = await req.axios.patch(
        `${authConfigURL}/sftp/v2/organizations/${organizationId}/sftp-config/${
          body.id
        }`,
        body,
        {
          headers: head,
        }
      )
    } else {
      const isDefaultFlag = isDefault === true ? 'true' : 'false'
      const formData = new FormData()
      formData.append('isDefault', isDefaultFlag)
      response = await req.axios.patch(
        `${authConfigURL}/sftp/v2/organizations/${organizationId}/sftp-config-with-privatekey/${
          body.id
        }`,
        formData,
        {
          headers: pkiHeaders(organizationId, userId, formData),
        }
      )
    }
    res.json(response.data)
  })
)

router.delete(
  '/sftp/:id',
  wrap(async (req, res) => {
    const { userId, organizationId } = req.meta
    const head = makeHeaders(organizationId, userId)
    const response = await req.axios.delete(
      `${authConfigURL}/sftp/v2/organizations/${organizationId}/sftp-config/${
        req.params.id
      }`,
      {
        headers: head,
      }
    )
    res.json(response.data)
  })
)

// const createPartner = async ({ userId, orgId, data, axios }) => {
//   try {
//     const {
//       vendorName,
//       displayName,
//       logo,
//       status,
//       businessRelationship,
//       businessModel,
//       contentRights,
//       dataStorageRegion,
//     } = data

//     // const hostName = sftpSource && sftpSource !== 'skillsoft_sftp' ? host : null
//     // const portNo = port === undefined || port === null ? 22 : port
//     // let body = {
//     //   vendorName,
//     //   displayName,
//     //   logo,
//     //   status,
//     //   businessRelationship,
//     //   businessModel,
//     //   contentRights,
//     //   dataStorageRegion,
//     // }

//     // body = omitBy(body, isNil)

//     // if (authSource === 'basic_auth') {
//     //   const response = await axios.post(
//     //     `${partnerConfigURL}/partner-management/v1/partners`,
//     //     body,
//     //     {
//     //       headers: makeHeaders(orgId, userId),
//     //     }
//     //   )
//     //   return response.data
//     // }

//     // const { buffer } = data
//     // const isDefaultFlag = isDefault === true ? 'true' : 'false'

//     const formData = new FormData()

//     formData.append('partnerName', vendorName)
//     formData.append('partnerDisplayName', displayName)
//     formData.append('partnerLogo', logo)
//     formData.append('status', status)
//     formData.append('businessRelationship', businessRelationship)
//     formData.append('businessModel', businessModel)
//     formData.append('contentRights', contentRights)
//     formData.append('dataStorageRegion', dataStorageRegion)
//     // formData.append('contactDetails', contactDetails)
//     // formData.append('contractDetails', contractDetails)
//     // if (hostName !== null) {
//     //   formData.append('host', hostName)
//     // }

//     // formData.append('userName', userName)
//     // formData.append('isDefault', isDefaultFlag)
//     // formData.append('port', portNo)
//     // formData.append('privateKey', buffer, {
//     //   filename: name,
//     //   contentType: 'application/octet-stream',
//     // })
//     const response = await axios.post(
//       `${partnerConfigURL}/partner-management/v1/partners`,
//       formData,
//       {
//         headers: pkiHeaders(orgId, userId, formData),
//       }
//     )
//     return response.data
//   } catch (err) {
//     return Promise.reject(err)
//   }
// }

// router.post(
//   '/partner-management',
//   wrap(async (req, res) => {
//     console.log("hello")
//     const { userId, organizationId } = req.meta
//     const reqObj = {
//       userId,
//       orgId: organizationId,
//       data: req.body,
//       axios: req.axios,
//     }
//     const partner = await createPartner(reqObj)
//     res.json(partner)
//   })
// )

const createAccount = async (data, axios, orgId, userId) => {
  try {
    const account = { ...data }
    //console.log('server account', account)
    // if (data.active === 'false') {
    //   account.active = false
    // } else {
    //   account.active = true
    // }
    //console.log(`${partnerConfigURL}/partner-management/v1/partners`)
    account.businessRelationship = [data.businessRelationship]
    // account.contentScope = 'STOCK'
    // account.curationPermission = 'SKILLSOFT'
    // account.launchSource = 'URL'
    // account.launchTarget = 'TAB'
    // account.trackingMethod = 'LAUNCH'
    // account.vendor = 'test'
    console.log('acc', account)
    const response = await axios.post(
      `${partnerConfigURL}/partner-management/v1/partners`,
      account,
      {
        headers: makeHeaders(orgId, userId),
      }
    )
    return response.data
  } catch (err) {
    return Promise.reject(err)
  }
}

router.post(
  '/sftp',
  wrap(async (req, res) => {
    // console.log('post partner-management')
    console.log('----', req.axios)
    const { userId, organizationId } = req.meta
    const account = await createAccount(
      req.body,
      req.axios,
      organizationId,
      userId
    )
    res.json(account)
  })
)
export default router
