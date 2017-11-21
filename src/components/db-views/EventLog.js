import React, { Component } from 'react'
import { Form, Input, Button } from 'antd'
const FormItem = Form.Item

export default class EventLog extends Component {
  constructor(props) {
    super(props)
    this.state = { eventField: '' }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log('handleSubmit', e)
    this.props.db.add(this.state.eventField)
    this.setState({ eventField: '' })
  }

  handleChange = (e) => {
    this.setState({ eventField: e.target.value })
  }

  get entries () {
    const { db } = this.props
    return !db ? [] : db.iterator({limit: -1}).collect().map((e) => e.payload.value)
  }

  render() {
    return (
      <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem>
            <Input value={this.state.eventField} onChange={this.handleChange} placeholder="Event"/>
          </FormItem>
          <FormItem>
            <Button
              icon="plus"
              disabled={!this.state.eventField}
              type="primary"
              htmlType="submit"
            >
              Add
            </Button>
          </FormItem>
        </Form>
        {
          this.entries.map((entry, i) => <p key={i}>{ JSON.stringify(entry) }</p>)
        }
      </div>
    )
  }
}