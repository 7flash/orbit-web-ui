import React from 'react'
import { Button } from 'antd'

export default function Counter ({ db }) {
  return (
    <div>
      <p>{ `Value: ${db.value}` }</p>
      <Button onClick={ () => db.inc() }>Increment</Button>
    </div>
  )
}