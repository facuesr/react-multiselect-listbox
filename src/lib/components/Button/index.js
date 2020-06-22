import React, { memo } from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const Button = ({ children, onClick, type = '' }) => {
  return (
    <button className={[styles.root, styles[type]].join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['add', 'remove'])
}

export default memo(Button)
