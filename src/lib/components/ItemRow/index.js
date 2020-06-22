import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const ItemRow = ({
  style,
  textField,
  itemData,
  onItemClick,
  provided = {},
  isDragging
}) => {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{ ...style, ...provided.draggableProps?.style }}
      className={`${styles.item} ${isDragging ? styles['is-dragging'] : ''}`}
      onClick={() => onItemClick(itemData)}
    >
      {<span>{itemData && itemData[textField]}</span>}
    </div>
  )
}

ItemRow.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object,
  isScrolling: PropTypes.bool,
  labelKey: PropTypes.string,
  itemData: PropTypes.object,
  onItemClick: PropTypes.func,
  provided: PropTypes.object
}

export default memo(ItemRow)
