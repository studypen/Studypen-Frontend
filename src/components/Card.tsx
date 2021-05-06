import React from 'react'
import PropTypes from 'prop-types'

type CardProps = { children: PropTypes.ReactNodeLike }

const Card: React.FC<CardProps> = ({ children }) => {
  return <div className="card">
    {children}
  </div>
}
Card.propTypes = {
  children: PropTypes.node,
}

export { Card }