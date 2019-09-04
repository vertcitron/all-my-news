
import Title from './components/Title'
import NewFeed from './components/NewFeed';

// insert the aggregator's title
new Title('All My News')

// insert the NewFeed component
const newFeed = new NewFeed(document.body)
newFeed.onAdd((url: string) => {
  console.warn('You added the "%s" feed.', url)
})
