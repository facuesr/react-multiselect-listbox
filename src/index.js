import React, { useState } from 'react'
import { render } from 'react-dom'
import MultiSelectListBox from './lib/index'
import './index.css'

const DemoMultiSelectListBox = () => {
  const [selectedTwo, setSelectedTwo] = useState([])

  return (
    <MultiSelectListBox
      // overrideStrings={{
      //   search: 'Search...',
      //   selectAll: 'Add All',
      //   removeAll: 'Remove All',
      //   selectedInfo: 'Items selected'
      // }}
      sortable={true}
      options={getOptions(5000)}
      textField="desc"
      valueField="value"
      value={selectedTwo}
      rowHeight={25}
      onSelect={({ item, sortedList }) => {
        setSelectedTwo(sortedList.map(i => i.value))
      }}
      onRemove={({ item }) => {
        setSelectedTwo([...selectedTwo.filter(i => i !== item.value)])
      }}
      onSelectAll={selectedItems => {
        const selected = [
          ...selectedTwo,
          ...selectedItems.map(item => item.value)
        ]
        setSelectedTwo(selected)
      }}
      onRemoveAll={() => setSelectedTwo([])}
      onSort={({ sortedList }) =>
        setSelectedTwo([...sortedList.map(i => i.value)])
      }
    />
  )
}

const getOptions = qty => {
  let options = []
  for (let i = 0; i < qty; i++) {
    options.push({
      desc: 'Item ' + i,
      value: i
    })
  }
  return options
}

render(<DemoMultiSelectListBox />, document.getElementById('root'))
