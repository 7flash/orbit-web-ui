import React, { Component } from 'react'
import { Spin } from 'antd'
import { init, createDb } from './db'
import DatabaseManager from './components/DatabaseManager'
import Counter from './components/db-views/Counter'
import EventLog from './components/db-views/EventLog'
import Feed from './components/db-views/Feed'

import './App.css'
import DatabaseInfo from './components/DatabaseInfo'

class App extends Component {
  constructor(props) {
    super(props)
    this.dbMap = {
      counter: Counter,
      eventlog: EventLog,
      feed: Feed
    }
    this.state = { inited: false }
    init().then(this.initDb)
  }

  initDb = () => {
    this.setState({ inited: true })
  }

  onWrite = (dbname, hash, entry) => {
    console.log('dbname', dbname, 'hash', hash, 'entry', entry)
    this.setState({ hash })
  }

  handleCreateDb = (name, type) => {
    createDb({ name, type, onWrite: this.onWrite }).then((db) => {
      this.setState({ db, type })
    })
  }

  renderDb = () => {
    const { inited, type, db } = this.state
    if (!inited || !db) return null
    const Component = this.dbMap[type]
    if (!Component) return <p>{ `Type ${type} not yet implemented` }</p>
    return <Component db={db}/>
  }

  render() {
    const { inited, db } = this.state
    if (!inited) return <Spin />
    return (
      <div className="App">
        {
          db ?
            <DatabaseInfo db={db} /> :
            <DatabaseManager onCreate={this.handleCreateDb} />
        }
        { this.renderDb() }
      </div>
    )
  }
}

export default App
