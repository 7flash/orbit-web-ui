import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

export default class EventLog extends Component {
  constructor(props) {
    super(props)
    this.state = { feedField: '' }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit', e)
    this.props.db.add(this.state.feedField)
    this.setState({ feedField: '' })
  }

  handleChange = (e) => {
    this.setState({ feedField: e.target.value })
  }

  handleRemove = (hash) => {
    this.props.db.remove(hash)
  }

  get entries () {
    const { db } = this.props
    return !db ? [] : db.iterator({limit: -1}).collect()
  }

  render() {
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            <Input value={this.state.feedField} onChange={this.handleChange} placeholder="Event"/>
          </FormItem>
          <FormItem>
            <Button
              icon="plus"
              disabled={!this.state.feedField}
              type="primary"
              htmlType="submit"
            >
              Add
            </Button>
          </FormItem>
        </Form>
        {
          this.entries.map((entry, idx) => (
            <div key={idx}>
              <div>
                { entry.payload.value }
                <Button
                  onClick={() => this.handleRemove(entry.hash)}
                  shape="circle"
                  icon="delete"
                  type="danger"
                />
              </div>
            </div>
          ))
        }
      </div>
    )
  }
}