import React, { Component } from 'react'
import { Button, Menu, Dropdown, Icon } from 'antd'

export default class CreateDatabase extends Component {
  constructor(props) {
    super(props)
    this.menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="feed">Feed</Menu.Item>
        <Menu.Item key="eventlog">Event Log</Menu.Item>
        <Menu.Item key="counter">Counter</Menu.Item>
        <Menu.Item key="docstore">Doc Store</Menu.Item>
        <Menu.Item key="kvstore">Key Value</Menu.Item>
      </Menu>
    )
  }

  handleMenuClick = ({ key }) => {
    const name = `key.${Math.round(Math.random() * 1e6)}`
    this.props.onCreate(name, key)
  }

  render() {
    const { db } = this.props
    if (!db) {
      return (
        <Dropdown
          overlay={this.menu}
          trigger={['click']}
        >
          <Button>
            Create DB <Icon type="down"/>
          </Button>
        </Dropdown>
      )
    }
    console.log(db)
    return `Name: ${db.dbname}\nID: ${db.id}\nAddress: ${db.address.toString()}`
  }
}
