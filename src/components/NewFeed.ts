import TextInput from './TextInput'
import Button from './Button'

export default class {
  private wrapper: HTMLDivElement
  private input: TextInput
  private button: Button

  private onAdded = (value: string) => {
    console.error('The handler to add the "%s" feed has not been defined yet.', value)
  }

  constructor (parent: HTMLElement) {
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'newfeed'
    this.input = new TextInput(this.wrapper, 'New Feed:', 'Enter a new feed URL to add it here...')
    this.input.onChange((value: string) => {
      this.onAdded(value)
      this.input.clear()
    })
    this.button = new Button(this.wrapper, 'Add Feed')
    this.button.onClick(() => {
      this.onAdded(this.input.value)
      this.input.clear()
    })
    parent.appendChild(this.wrapper)
  }

  onAdd (f: (value: string) => void) {
    this.onAdded = f
  }
}
