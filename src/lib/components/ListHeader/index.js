import React, { memo } from 'react'
import styles from './styles.module.scss'

const ListHeader = ({ children }) => {
  return <div className={styles.root}>{children}</div>
}

export default memo(ListHeader)
