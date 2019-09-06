import { RawFeedItem, RawFeed } from './interfaces/RawFeed'

export default class {
  readonly author: string = ''
  readonly description: string = ''
  readonly image: string = ''
  readonly link: string = ''
  readonly title: string = ''
  readonly url: string = ''
  readonly status: string = ''
  public selected: boolean = true

  constructor (raw: RawFeed) {
    this.author = raw.feed.author || ''
    this.description = raw.feed.description || ''
    this.image = raw.feed.image || ''
    this.link = raw.feed.link || ''
    this.title = raw.feed.title || ''
    this.url = raw.feed.url || ''
    this.status = raw.status || ''
  }
}
