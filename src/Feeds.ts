import Feed from './Feed'

export default class {
  private wrapper: HTMLDivElement
  private feeds: Feed[] = []

  constructor (parent: HTMLElement) {
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'feeds'
    parent.appendChild(this.wrapper)
    this.update()
  }

  addUrl (url: URL) {
    this.feeds.push(new Feed(url))
    this.update()
  }

  private update() {
    this.wrapper.innerHTML = ''
    for (const feed of this.feeds) {
      const feedLine = document.createElement('p')
      feedLine.textContent = feed.url.href
      this.wrapper.appendChild(feedLine)
    }
  }
}
