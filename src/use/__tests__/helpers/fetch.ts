export class Response {
  data: object | null = null
  headers = {}
  ok = true
  redirected = false
  status = 200
  statusText = 'OK'
  type = 'basic'
  url = ''
  useFinalURL = true
  body = ''
  bodyUsed = true

  constructor(responseObject: object) {
    this.data = responseObject
    this.body = JSON.stringify(responseObject)
  }

  json() {
    return this.data
  }
}
