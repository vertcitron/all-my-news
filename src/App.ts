
import Title from './components/Title'
import NewFeed from './components/NewFeed'
import Feeds from './Feeds'

// insert the aggregator's title
new Title('All My News')

// insert the NewFeed component
const newFeed = new NewFeed(document.body)

// inserts the Feeds component
const feeds = new Feeds(document.body)

// handles the addition of an url the the feeds
newFeed.onAdd((url: string) => {
  try {
    feeds.addUrl(new URL(url))
  } catch {
    console.error('This is not a valid URL.')
  }
})
