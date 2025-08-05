import React from 'react'
import { useParams } from 'react-router-dom'

const BoardPanel = () => {
  const { id } = useParams();
  return (
    <div>
      
      BoardPanel {id}</div>

  )
}

export default BoardPanel