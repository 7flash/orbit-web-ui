import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'
let db = null
let orbitdb = null

// Configuration for IPFS instance
const ipfsConfig = {
  repo: '/orbit-web-ui/',
  EXPERIMENTAL: {
    pubsub: true,
  },
  config: {
    Addresses: {
      Swarm: [
        // Use IPFS dev signal server
        '/dns4/star-signal.cloud.ipfs.team/wss/p2p-webrtc-star',
      ]
    },
  }
}

// Configuration for the database
const dbConfig = {
  // If database doesn't exist, create it
  create: true,
  // Don't wait to load from the network
  sync: false,
  // Load only the local version of the database
  localOnly: true,
  // Allow anyone to write to the database,
  // otherwise only the creator of the database can write
  admin: ['*'],
  write: ['*'],
}

export async function init() {
  return new Promise((resolve, reject) => {
    // Create IPFS instance
    const ipfs = new IPFS(ipfsConfig)

    ipfs.on('error', (e) => console.error(e))
    ipfs.on('ready', async () => {
      try {
        orbitdb = new OrbitDB(ipfs)
        // Done
        resolve(db)
      } catch (e) {
        reject(e)
      }
    })
  })
}

export async function createDb({name, type, onWrite}) {
  db = await orbitdb[type](name, dbConfig)
  db.events.on('write', onWrite)
  return db
}