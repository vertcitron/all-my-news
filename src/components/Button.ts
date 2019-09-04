export default class {
  private button: HTMLButtonElement
  private clickCallback: () => void = () => {
    console.error('An action for this button has not been defined yet.')
  }

  constructor (text: string, parent: HTMLElement, variant: string = '') {
    this.button = document.createElement('button')
    this.button.className = variant
    this.button.textContent = text
    this.button.addEventListener('click', (e: MouseEvent) => {
      this.clickCallback()
    })
    parent.appendChild(this.button)
  }

  onClick (f: () => void) {
    this.clickCallback = f
  }
}
