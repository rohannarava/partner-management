import PropTypes from 'prop-types'

export default {
  id: PropTypes.string,
  sftpSource: PropTypes.string,
  name: PropTypes.string,
  host: PropTypes.string,
  isDefault: PropTypes.bool,
  userName: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  createdAt: PropTypes.string,
}
