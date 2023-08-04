import classNames from 'classnames/bind'
import { FC, memo, useCallback, useMemo, useState } from 'react'
import { Input } from 'antd'

const View:FC = () => {
  return <div>
    <span>label: </span>
    <Input />
  </div>
}

export default memo(View)
