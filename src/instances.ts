export default {
  has(key) {
    return !!global[key]
  },
  get(key) {
    return global[key]
  },
  set(key, value) {
    global[key] = value
  },
  delete(key) {
    delete global[key]
  },
}
