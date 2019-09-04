export default class {
  private wrapper: HTMLDivElement
  private label: HTMLLabelElement
  private input: HTMLInputElement
  private onChanged = (value: string) => {
    console.error('A handler for TextInput "change" event has not been defined yet...')
  }

  constructor (parent: HTMLElement, label: string = '', placeholder: string = '') {
    this.wrapper = document.createElement('div')
    this.wrapper.className = 'textinput'
    this.label = document.createElement('label')
    this.label.textContent = label
    if (label) {
      this.wrapper.appendChild(this.label)
    }
    this.input = document.createElement('input')
    this.input.type = 'text'
    this.input.placeholder = placeholder
    this.input.addEventListener('keydown', this.onKeydown)
    this.wrapper.appendChild(this.input)
    parent.appendChild(this.wrapper)
  } 

  private onKeydown = (e: KeyboardEvent) => {
    if (e.code.includes('Enter')) {
      this.onChanged(this.input.value)
    }
  }

  onChange (f: (value: string) => void) {
    this.onChanged = f
  }

  get value () {
    return this.input.value
  }

  set value (v: string) {
    this.input.value = v
  }

  clear () {
    this.input.value = ''
  }
}
