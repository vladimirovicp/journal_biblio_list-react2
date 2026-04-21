import { Select } from 'antd'
import type { SelectProps } from 'antd'

export default function CustomSelect<ValueType = unknown>(
  props: SelectProps<ValueType>,
) {
  return <Select {...props} />
}
