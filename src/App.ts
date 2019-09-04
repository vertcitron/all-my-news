
import Title from './components/Title'
import Button from './components/Button'
import TextInput from './components/TextInput'

// inserts some components for testing
new Title('All My News')
const clickMe = new Button(document.body, 'Click Me')
clickMe.onClick(() => {
  console.warn('Handler changed !')
})
const textInput = new TextInput(document.body, 'My Input', 'Enter what you want...')
textInput.onChange ((value: string) => {
  console.warn('You entered:', value)
})
