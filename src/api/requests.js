import axios from 'axios'

const baseURL = 'https://random-data-api.com/api'

export const makeRequest = ({
  url, method = 'get', data = {}, withBaseUrl = true, headers = {}
}) => axios({
  url,
  method,
  data,
  baseURL: withBaseUrl ? baseURL : '',
  headers: {
    ...headers
  }
})
