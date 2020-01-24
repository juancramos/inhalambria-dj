import { makeAuthPlugin } from '../services/feathers-client'

export default makeAuthPlugin({ userService: 'users' })