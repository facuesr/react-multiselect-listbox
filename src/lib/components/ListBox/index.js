import React, { memo } from 'react'
import { FixedSizeList as List, areEqual } from 'react-window'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import AutoSizer from 'react-virtualized-auto-sizer'
import ItemRow from '../ItemRow'
import styles from './styles.module.scss'

const ListBox = ({
  id,
  children: header,
  data = [],
  onItemClick,
  height,
  rowHeight,
  textField,
  valueField,
  sortable
}) => {
  const Row = memo(({ data: items, index, style }) => {
    const item = items[index]
    const props = {
      itemData: item,
      textField: textField,
      onItemClick: onItemClick,
      style: style
    }
    return sortable ? (
      <Draggable
        draggableId={item[valueField].toString()}
        index={index}
        key={item[valueField]}
      >
        {provided => <ItemRow {...props} provided={provided} />}
      </Draggable>
    ) : (
      <ItemRow {...props} />
    )
  }, areEqual)

  const listProps = {
    className: styles.container,
    height: height,
    itemCount: data.length,
    itemSize: rowHeight,
    itemData: data
  }

  return (
    <div className={styles.root}>
      {header}
      <AutoSizer disableHeight>
        {({ width }) =>
          sortable ? (
            <Droppable
              isDropDisabled={id === 'options'}
              droppableId={id}
              mode="virtual"
              renderClone={(provided, snapshot, rubric) => {
                const item = data[rubric.source.index]
                return (
                  <ItemRow
                    itemData={item}
                    onItemClick={onItemClick}
                    textField={textField}
                    provided={provided}
                    isDragging={snapshot.isDragging}
                  />
                )
              }}
            >
              {provided => (
                <List {...listProps} width={width} outerRef={provided.innerRef}>
                  {Row}
                </List>
              )}
            </Droppable>
          ) : (
            <List {...listProps} width={width}>
              {Row}
            </List>
          )
        }
      </AutoSizer>
    </div>
  )
}

export default memo(ListBox)
