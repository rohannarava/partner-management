import React from 'react'
import { shallowWithIntl } from 'enzyme-react-intl'
import { mount } from '../../../../common/enzymeHelper/enzymeHelper'
import KeyUpload from '../../components/KeyUpload'

const initialProps = {
  label: 'Private Key',
  id: 'privateKey_id',
  name: 'privateKey_name',
  onDrop: jest.fn(),
  handleChange: jest.fn(),
}

const file = [{ lastModifiedDate: '3443434', name: 'file.txt' }]

describe('<KeyUpload />', () => {
  const wrapper = mount(<KeyUpload {...initialProps} />, {
    intl: true,
  })

  it('should create KeyUpload', () => {
    expect(wrapper.find('KeyUpload').length).toBe(1)
  })

  it('should have FieldContainer', () => {
    expect(wrapper.find('FieldContainer')).toHaveLength(1)
  })

  it('should have a label prop in FieldContainer', () => {
    expect(wrapper.find('FieldContainer').prop('label')).toContain(
      initialProps.label
    )
  })

  it('should have a id prop in FieldContainer', () => {
    expect(wrapper.find('FieldContainer').prop('id')).toContain(initialProps.id)
  })

  const fieldContainer = wrapper.find('FieldContainer')

  it('should have a button in FieldContainer', () => {
    expect(fieldContainer.find('Button')).toHaveLength(1)
  })

  it('should have a label for the button', () => {
    expect(fieldContainer.find('Button').prop('label')).toContain('Browse')
  })

  it('should have a cogaAction for the button', () => {
    expect(fieldContainer.find('Button').prop('cogaAction')).toContain('upload')
  })

  it('should have FieldMessage', () => {
    expect(wrapper.find('FieldMessage')).toHaveLength(1)
  })

  it('should have a Browse button', () => {
    const browseButton = wrapper.find('button[type="button"]')
    expect(browseButton).toHaveLength(1)
  })
})

describe('onDrop', () => {
  const keyUploadWrapper = shallowWithIntl(<KeyUpload {...initialProps} />)

  const instanceWrapper = keyUploadWrapper.dive().dive()

  it('should set the file name on calling onDrop function', () => {
    expect(instanceWrapper.state().uploadFileName).toBe(null)
    instanceWrapper.instance().onDrop(file)
    instanceWrapper.instance().forceUpdate()
    expect(instanceWrapper.state().uploadFileName).toBe('file.txt')
  })
})
