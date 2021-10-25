import React, { memo, useState, useMemo, useCallback } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { defaultStrings } from './defaults'
import Button from './components/Button'
import SelectedListHeader from './components/SelectedListHeader'
import OptionListHeader from './components/OptionListHeader'
import ListBox from './components/ListBox'
import styles from './styles.module.scss'

const MultiSelectListBox = ({
  overrideStrings = defaultStrings,
  boxHeight = 175,
  rowHeight = 25,
  textField = 'text',
  valueField = 'value',
  sortable,
  options,
  value,
  onSelect,
  onRemove,
  onSelectAll,
  onRemoveAll,
  onSort,
  onSearch
}) => {
  const { search, selectAll, removeAll, selectedInfo } = overrideStrings
  const [query, setQuery] = useState('')

  const availableOptions = useMemo(() => {
    const items = options.filter((item) => !value.includes(item[valueField]));
    return onSearch
      ? onSearch({
          items,
          query,
          textField,
        })
      : items.filter((item) => item[textField].includes(query));
  }, [options, query, textField, value, valueField, onSearch]);

  const selectedOptions = useMemo(
    () =>
      options
        .filter(item => value.includes(item[valueField]))
        .sort(
          (a, b) => value.indexOf(a[valueField]) - value.indexOf(b[valueField])
        ),
    [options, value, valueField]
  )

  const handleSelectAll = useCallback(() => {
    if (onSelectAll) {
      onSelectAll([...availableOptions])
      setQuery('')
    }
  }, [availableOptions, onSelectAll])

  const onItemAdd = useCallback(
    (item, sortedList) => {
      if (!sortedList) {
        sortedList = selectedOptions.slice()
        sortedList.push(item)
      }
      onSelect && onSelect({ item, sortedList })
    },
    [onSelect, selectedOptions]
  )

  const onItemRemove = useCallback(
    item => {
      onRemove && onRemove({ item })
    },
    [onRemove]
  )

  const onDragEnd = useCallback(
    result => {
      const { source, destination } = result
      if (
        destination &&
        source &&
        source.droppableId !== destination.droppableId
      ) {
        const item = availableOptions[source.index]
        const sortedList = selectedOptions.slice()
        sortedList.splice(destination.index, 0, item)
        onItemAdd(item, sortedList)
        return
      }
      if (!result.destination) {
        return
      }

      const sortedList = selectedOptions.slice()
      const [item] = sortedList.splice(source.index, 1)
      sortedList.splice(destination.index, 0, item)
      onSort && onSort({ sortedList })
    },
    [availableOptions, onItemAdd, onSort, selectedOptions]
  )

  return (
    <div className={`${styles.root}`}>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListBox
          id={'options'}
          height={boxHeight}
          rowHeight={rowHeight}
          textField={textField}
          valueField={valueField}
          data={availableOptions}
          onItemClick={onItemAdd}
          sortable={sortable}
        >
          <OptionListHeader
            searchPlaceHolder={search}
            query={query}
            onQueryChange={e => setQuery(e.target.value)}
            actionButton={
              <Button onClick={handleSelectAll} type="add">
                {selectAll}
              </Button>
            }
          />
        </ListBox>
        <ListBox
          id={'selected'}
          height={boxHeight}
          rowHeight={rowHeight}
          textField={textField}
          valueField={valueField}
          data={selectedOptions}
          onItemClick={onItemRemove}
          sortable={sortable}
        >
          <SelectedListHeader
            count={value.length}
            label={selectedInfo}
            actionButton={
              <Button onClick={onRemoveAll} type="remove">
                {removeAll}
              </Button>
            }
          />
        </ListBox>
      </DragDropContext>
    </div>
  )
}

export default memo(MultiSelectListBox)
