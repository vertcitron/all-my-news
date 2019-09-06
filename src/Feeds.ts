import { RawFeed } from './interfaces/RawFeed'
import Feed from './Feed'
import FeedBlock from './components/FeedBlock'

export default class {
  private wrapper: HTMLDivElement
  private title: HTMLHeadingElement
  private container: HTMLDivElement
  private feeds: Feed[] = []

  constructor (parent: HTMLElement) {
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'feeds'
    this.title = document.createElement('h3')
    this.title.textContent = 'Feeds Selector'
    this.container = document.createElement('div')
    this.container.className = 'feeds-container'
    this.container.textContent = 'Feeds list...'
    this.wrapper.appendChild(this.title)
    this.wrapper.appendChild(this.container)
    parent.appendChild(this.wrapper)
    this.restore()
    this.update()
  }

  private update() {
    this.container.innerHTML = ''
    for (let i = 0; i < this.feeds.length; i++) {
      const feedBlock = new FeedBlock(this.container, this.feeds[i], i)
      feedBlock.onChange((i: number) => {
        this.feeds[i].selected = !this.feeds[i].selected
        this.update()
        this.save()
      })
    }
  }

  addUrl (url: URL, selected = true) {
    this.getFeedFromUrl(url)
      .then((rawFeed: RawFeed) => {
        const feed = new Feed(rawFeed)
        feed.selected = selected
        this.feeds.push(feed)
        this.save()
        this.update()
      })
      .catch(error => {
        console.error('Error requesting RSS feed at %s', url.href)
      })
  }

  private save (): void {
    const toSave = JSON.stringify(this.feeds.map(feed => ({
      url: feed.url,
      selected: feed.selected
    })))
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
        this.addUrl(new URL(item.url), item.selected)
      }
    }
    this.save()
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
