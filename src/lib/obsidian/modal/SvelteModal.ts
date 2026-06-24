import { type Component, type ComponentProps, mount, unmount } from 'svelte'
import { Modal } from 'obsidian'

export class SvelteModal<T extends Component> extends Modal {
  #component: T
  #props?: ComponentProps<T>
  #instance?: ReturnType<typeof mount>

  constructor(
    p_component: T,
    p_props?: ComponentProps<T> & { onclose: () => void },
  ) {
    super(app)
    this.#component = p_component
    this.#props = p_props
  }

  onOpen(): Promise<void> | void {
    this.#instance = mount(this.#component, {
      target: this.contentEl,
      props: this.#props,
    })
    return super.onOpen()
  }

  onClose() {
    if (this.#instance) {
      unmount(this.#instance)
    }
    super.onClose()
  }
}
