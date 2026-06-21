import { type IconName, ItemView, WorkspaceLeaf } from 'obsidian'
import { mount, unmount } from 'svelte'
import TagFoldersViewSvelte from './TagFoldersViewSvelte.svelte'

export const VIEW_TYPE_TAG_FOLDERS = 'tag-folders-view'

export class TagFoldersView extends ItemView {
  #instance: ReturnType<typeof mount> | undefined

  constructor(leaf: WorkspaceLeaf) {
    super(leaf)
  }

  getViewType() {
    return VIEW_TYPE_TAG_FOLDERS
  }

  getDisplayText() {
    return 'Tag Folders'
  }

  getIcon(): IconName {
    return 'table-of-contents'
  }

  async onOpen() {
    const container = this.containerEl as HTMLElement
    // clear out div elements that obsidian automatically adds to the containerEl...
    container.replaceChildren()

    const context = new Map<unknown, unknown>()
    context.set('app', this.app)

    this.#instance = mount(TagFoldersViewSvelte, {
      target: container,
      context,
    })
  }

  async onClose() {
    if (this.#instance) {
      unmount(this.#instance)
    }
  }
}
