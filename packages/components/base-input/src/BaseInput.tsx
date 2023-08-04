import classNames from 'classnames/bind'
import { FC, memo, useCallback, useMemo, useState } from 'react'
import { Input } from 'antd'

interface Props {
  /**
   * @description 属性描述
   * @default "默认值"
   */
   title?: string;
}

const View:FC<Props> = ({title='label'}) => {
  return <div>
    <span>{title}: ddrrr</span>
    <Input />
  </div>
}

export default memo(View)
