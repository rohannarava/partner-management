import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Dropzone from 'react-dropzone'
import { injectIntl, intlShape } from 'react-intl'
import Button from '@skillsoft/ui/lib/Button'
import FieldContainer from '@skillsoft/ui/lib/FieldContainer'
import InputShape from '../shapes/InputShape'
import styles from './SftpForm.css'
import messages from '../messages'

class KeyUpload extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: false,
      isPointingDevice: false,
      uploadFileName: null,
    }
  }

  handleFocus = (...args) => {
    const { onFocus } = this.props
    this.setState({ focused: true })
    onFocus(...args)
  }

  handleChange = (...args) => {
    const { onChange } = this.props
    onChange(...args)
  }

  handleBlur = (...args) => {
    const { uploadFileName } = this.state
    const { onBlur } = this.props
    this.setState({ focused: false, isPointingDevice: false })
    if (uploadFileName === null) {
      onBlur(...args)
    }
  }

  onDrop = ([file] = []) => {
    if (file) {
      this.setState({
        uploadFileName: file.name,
      })
    }
  }

  renderField = describedBy => {
    const {
      id,
      required,
      error,
      type,
      name,
      value,
      autoComplete,
      disabled,
      intl,
    } = this.props

    const { uploadFileName, focused, isPointingDevice } = this.state

    return (
      <Dropzone
        onDrop={this.onDrop}
        multiple={false}
        className={classNames(styles.fileUploadGroup, {
          [styles.focused]: focused,
          'focus-ring': focused && !isPointingDevice,
          [styles.invalid]: Boolean(error),
          [styles.disabled]: disabled,
        })}
        id={id}
        name={name}
        type={type}
        value={value}
        aria-required={required}
        onChange={this.handleChange}
        onMouseDown={() => {
          this.setState({ isPointingDevice: true })
        }}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        autoComplete={autoComplete}
        aria-describedby={describedBy}
      >
        <div data-marker="DropZone" className={styles.dropZone}>
          <div className={styles.text}>{uploadFileName}</div>
          <Button
            kind="secondary"
            label={intl.formatMessage(messages.browse)}
            cogaAction="upload"
          />
        </div>
      </Dropzone>
    )
  }

  render() {
    const { label, id, required, showRequired, info, error } = this.props
    const { focused } = this.state
    return (
      <FieldContainer
        focused={focused}
        id={id}
        label={label}
        required={required && showRequired}
        error={error}
        info={info}
        field={this.renderField}
      />
    )
  }
}

KeyUpload.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool,
  showRequired: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['file']),
  value: PropTypes.string,
  error: PropTypes.node,
  autoComplete: PropTypes.oneOf(['off']),
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  info: PropTypes.node,
  intl: intlShape.isRequired,
}

KeyUpload.defaultProps = {
  label: '',
  autoComplete: 'off',
  required: false,
  showRequired: true,
  value: '',
  disabled: false,
  type: 'file',
  error: null,
  onChange: () => {},
  onBlur: () => {},
  onFocus: () => {},
  info: null,
}

const IntlKeyUpload = injectIntl(KeyUpload)

export default injectIntl(IntlKeyUpload)

export function renderKeyUploadInput({
  input,
  meta: { touched, error },
  ...customProps
}) {
  return <IntlKeyUpload {...input} {...customProps} error={touched && error} />
}
renderKeyUploadInput.propTypes = {
  input: PropTypes.shape(InputShape),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
}

renderKeyUploadInput.defaultProps = {
  input: {},
  meta: {
    error: null,
    touched: false,
  },
}
