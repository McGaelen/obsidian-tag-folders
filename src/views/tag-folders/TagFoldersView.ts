import { type IconName, ItemView, WorkspaceLeaf } from 'obsidian'
import { mount } from 'svelte'
import Main from './Main.svelte'

export const VIEW_TYPE_TAG_FOLDERS = 'tag-folders-view'

export class TagFoldersView extends ItemView {
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

    const context: Map<any, any> = new Map()
    context.set('app', this.app)

    mount(Main, {
      target: container,
      context,
    })
  }

  async onClose() {
    // Nothing to clean up.
  }
}
