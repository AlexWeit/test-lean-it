import { makeRequest } from '../requests'

export const getUsers = () => makeRequest({
  url: '/users/random_user?size=100'
})
