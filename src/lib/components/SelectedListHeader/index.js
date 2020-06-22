import React, { memo } from 'react'
import ListHeader from '../ListHeader'
import styles from './styles.module.scss'

const SelectedListHeader = ({ count, label, actionButton }) => {
  return (
    <ListHeader>
      <div className={styles.info}>
        <span>
          {count} {label}
        </span>
      </div>
      {actionButton}
    </ListHeader>
  )
}

export default memo(SelectedListHeader)
