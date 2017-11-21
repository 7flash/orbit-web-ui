import React from 'react'
import { Col, Row, Tag } from 'antd'

export default function DatabaseInfo({ db }) {
  return (
    <div>
      <Row type="flex">
          <Tag color="blue">Name</Tag>
          <p>{db.dbname}</p>
      </Row>
      <Row type="flex">
          <Tag color="blue">Address</Tag>
          <p>{db.address.toString()}</p>
      </Row>
      <Row type="flex">
        <Tag color="blue">Public key</Tag>
        <p>{db.key.getPublic('hex')}</p>
      </Row>
    </div>
  )
}