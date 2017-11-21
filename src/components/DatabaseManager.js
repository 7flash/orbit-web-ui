import React, { Component } from 'react'
import { Button, Form, Input, Modal, Select } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

export default class CreateDatabase extends Component {
  constructor(props) {
    super(props)
    this.state = { addressField: '', nameField: `db.${Math.round(Math.random() * 1e6)}`, type: 'feed' }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onCreate(this.state.nameField, this.state.type, this.state.addressField)
  }

  handleTypeChange = (type) => {
    this.setState({ type })
  }

  handleNameChange = (e) => {
    this.setState({ nameField: e.target.value })
  }

  handleAddressChange = (e) => {
    this.setState({ addressField: e.target.value })
  }

  render() {
    return (
      <Modal
        title="Create or join a DB"
        visible={true}
        footer={null}
        width={750}
      >
        <Form
          layout="horizontal"
          onSubmit={this.handleSubmit}>
          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            label="Name">
            <Input value={this.state.nameField} onChange={this.handleNameChange} placeholder="Name"/>
          </FormItem>
          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            label="Address">
            <Input value={this.state.addressField} onChange={this.handleAddressChange} placeholder="Address (leave empty to create db)"/>
          </FormItem>
          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 4 }}
            label="DB Type">
            <Select
              value={this.state.type}
              onChange={this.handleTypeChange}
            >
              <Option value="feed">Feed</Option>
              <Option value="eventlog">Event Log</Option>
              <Option value="counter">Counter Log</Option>
            </Select>
          </FormItem>
          <FormItem
            wrapperCol={{ span: 8, offset: 4 }}
          >
            <Button
              disabled={!this.state.addressField && !this.state.nameField}
              type="primary"
              htmlType="submit"
            >
              Create / Join
            </Button>
          </FormItem>
        </Form>
      </Modal>
    )
  }
}
