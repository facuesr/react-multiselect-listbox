import React, { memo } from 'react'
import ListHeader from '../ListHeader'
import styles from './styles.module.scss'

const OptionListHeader = ({
  query,
  searchPlaceHolder,
  onQueryChange,
  actionButton
}) => {
  return (
    <ListHeader>
      <input
        type="text"
        className={styles.search}
        value={query}
        onChange={onQueryChange}
        placeholder={searchPlaceHolder}
      />
      {actionButton}
    </ListHeader>
  )
}

export default memo(OptionListHeader)
