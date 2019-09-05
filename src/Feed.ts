export default class {
  private _url: URL

  constructor (url: URL) {
    this._url = url
  }

  get url (): URL {
    return this._url
  }
}
