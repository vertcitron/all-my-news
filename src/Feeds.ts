import { RawFeed } from './interfaces/RawFeed'
import Feed from './Feed'

export default class {
  private wrapper: HTMLDivElement
  private feeds: Feed[] = []

  constructor (parent: HTMLElement) {
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'feeds'
    parent.appendChild(this.wrapper)
    this.restore()
    this.update()
  }

  addUrl (url: URL) {
    this.getFeedFromUrl(url)
      .then((rawFeed: RawFeed) => {
        this.feeds.push(new Feed(rawFeed))
        this.save()
        this.update()
      })
      .catch(error => {
        console.error('Error requesting RSS feed at %s', url.href)
      })
  }

  private save (): void {
    const toSave = JSON.stringify(this.feeds.map(feed => ({ url: feed.url })))
    if (toSave === '[]') {
      localStorage.removeItem('feeds')
    } else {
      localStorage.setItem('feeds', toSave)
    }
  }

  private restore (): void {
    const saved = localStorage.getItem('feeds')
    if (saved) {
      for (const item of JSON.parse(saved)) {
        this.addUrl(new URL(item.url))
      }
    }
    this.save()
  }

  private update() {
    this.wrapper.innerHTML = ''
    for (const feed of this.feeds) {
      const feedLine = document.createElement('p')
      feedLine.textContent = feed.title
      this.wrapper.appendChild(feedLine)
    }
  }

  private getFeedFromUrl (url: URL): Promise<RawFeed> {
    const rss2json = 'https://api.rss2json.com/v1/api.json?rss_url='
    const urlToGet = encodeURI(rss2json + url.href)
    return fetch (urlToGet)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
      })
      .then(body => {
        return body
      })
      .then(data => {
        return data.status === 'ok' ? data : Promise.reject()
      })
  }
}
