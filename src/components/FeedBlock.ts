import Feed from '../Feed'

export default class {
  private id: number = -1

  constructor (parent: HTMLElement, feed: Feed, id: number) {
    this.id = id
    const wrapper: HTMLDivElement = document.createElement('div')
    wrapper.className = 'feed-block'
    const checkbox: HTMLInputElement = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = feed.selected
    wrapper.addEventListener('click', (e: MouseEvent): void => {
      this.onChanged(this.id)
    })
    wrapper.appendChild(checkbox)
    const title: HTMLSpanElement = document.createElement('span')
    title.className = feed.selected ? '' : 'striked'
    title.textContent = feed.title
    wrapper.appendChild(title)
    parent.appendChild(wrapper)
  }

  private onChanged = (i: number): void => {
    console.error(`An handler for checkbox #${this.id} state change has not been implemented yet.`)
  }

  onChange (f: (i: number) => void): void {
    this.onChanged = f
  }
}
