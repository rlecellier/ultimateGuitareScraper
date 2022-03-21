
const parse = queryParams =>
  Object.fromEntries(new URLSearchParams(queryParams))

const stringify = queryParams =>
  new URLSearchParams(queryParams).toString()

module.exports = {
  parse,
  stringify,
}