import React, { useState } from 'react'
import { render } from 'react-dom'
import MultiSelectListBox from './lib/components/MultiSelectListBox'
import './index.css'

const DemoMultiSelectListBox = () => {
  const [selectedTwo, setSelectedTwo] = useState([])

  return (
    <div className="container">
      <MultiSelectListBox
        overrideStrings={{
          search: 'Search...',
          selectAll: 'Add All',
          removeAll: 'Remove All',
          selectedInfo: 'Items selected'
        }}
        options={[
          { desc: 'item 1', value: 1 },
          { desc: 'item 2', value: 2 }
        ]}
        textField="desc"
        valueField="value"
        value={selectedTwo}
        rowHeight={25}
        onSelect={({ item }) => {}}
        onRemove={({ item }) => {}}
        onSelectAll={selectedItems => {}}
        onRemoveAll={() => setSelectedTwo([])}
        sortable={true}
        onSort={({ sortedList }) => {}}
      />
      <h5>Example 2</h5>
      <MultiSelectListBox
        className={'multi-select'}
        overrideStrings={{
          search: 'Search...',
          selectAll: 'Add All',
          removeAll: 'Remove All',
          selectedInfo: 'Items selected'
        }}
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
    </div>
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
