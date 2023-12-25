export default class Http {
  constructor(axios, getCredential) {
    this.axios = axios
    this.getCredential = getCredential
  }
  request(config) {
    config = this.getCredential(config)
    return this.axios.request(config)
  }
  get(url, config) {
    config = this.getCredential(config)
    return this.axios.get(url, config)
  }
  post(url, data, config) {
    config = this.getCredential(config)
    return this.axios.post(url, data, config)
  }
  put(url, data, config) {
    config = this.getCredential(config)
    return this.axios.put(url, data, config)
  }
  patch(url, data, config) {
    config = this.getCredential(config)
    return this.axios.patch(url, data, config)
  }
  delete(url, config) {
    config = this.getCredential(config)
    return this.axios.delete(url, config)
  }
}
