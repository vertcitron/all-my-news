export default class {
  private h1: HTMLHeadingElement

  constructor (text: string, parent: HTMLElement = document.body) {
    this.h1 = document.createElement('h1')
    this.h1.textContent = text
    this.h1.style.textAlign = 'center'
    parent.appendChild(this.h1)
  }
}
