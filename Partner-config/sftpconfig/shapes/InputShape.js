import PropTypes from 'prop-types'

export default {
  name: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onDragStart: PropTypes.func,
  value: PropTypes.string,
}
