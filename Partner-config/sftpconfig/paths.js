export default function getSftpViewsPath(view, id) {
  const sftpPath = '/admin/partner-management'
  if (id) return `${sftpPath}/${id}/${view}`
  if (view && view !== 'partner-management') return `${sftpPath}/${view}`
  return sftpPath
}
