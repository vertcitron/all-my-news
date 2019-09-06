export interface RawFeedItem {
  author: string
  categories?: string[]
  content: string
  description?: string
  enclosure?: object
  guid: string
  link: string
  pubDate: string
  thumbnail?: string
  title: string
}

export interface RawFeed {
  feed: {
    author: string
    description: string
    image?: string
    link: string
    title: string
    url: string
  }
  items: RawFeedItem[]
  status: string
}
