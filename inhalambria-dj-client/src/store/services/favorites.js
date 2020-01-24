import feathersClient, { makeServicePlugin, BaseModel } from '../../services/feathers-client'

class Track extends BaseModel {
  constructor(data, options) {
    super(data, options)
  }
  // Required for $FeathersVuex plugin to work after production transpile.
  static modelName = 'Track'
  // Define default properties here
  static instanceDefaults() {
    return {
      track_title: '',
      album_name: '',
      tracks_count: '',
      release_date: '',
      artist: '',
      trackId: '',
      createdAt: '',
      updatedAt: ''
    }
  }
}
const servicePath = 'favorites'
const servicePlugin = makeServicePlugin({
  Model: Track,
  service: feathersClient.service(servicePath),
  servicePath,
  idField: 'id'
})

// Setup the client-side Feathers hooks.
feathersClient.service(servicePath).hooks({
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },
  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
})

export default servicePlugin