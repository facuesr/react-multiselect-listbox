# MultiSelectListBox

## Description

A multiselect list box component for <a href="https://reactjs.org/" target="_blank">React</a>.

![react-multiselect-listbox demo](demo.gif)

## Examples

- Basic <a href="https://codesandbox.io/s/multi-select-listbox-example-lgvdf?file=/src/App.js" target="_blank">example</a> with dnd sorting

## Installation

`npm install react-multiselect-listbox --save`

Then, you can import react-multiselect-listbox in your app as follows:

```js
import MultiSelectListBox from 'react-multiselect-listbox'
```

## Usage

```js
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
```

## I18n

Custimize text messages by passing prop overrideStrings

```js
 <MultiSelectListBox
        overrideStrings={{
          search: 'Search...',
          selectAll: 'Add All',
          removeAll: 'Remove All',
          selectedInfo: 'Items selected'
        }}
        ...
```

## Theming

Override CSS Variables

```css
:root {
  --mslb-bg-color: #fff;
  --mslb-font-color: #000;
  --mslb-border-color: #e0e0e0;
  --mslb-btn-font-color: #fff;
  --mslb-btn-bg-add-color: #00bfa5;
  --mslb-btn-bg-remove-color: #ff5252;
  --mslb-item-hover-bg-color: #f5f5f5;
}
```

## Credits

- This component gets some pieces of logical code from [react-multi-select-component](https://github.com/harshzalavadiya/react-multi-select-component/)
- [react-window](https://github.com/bvaughn/react-window)
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd)
- <a href="">Federico Vicente</a> for help with the styles.

## License

MIT Licensed.
