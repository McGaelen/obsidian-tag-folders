import { type IconName, ItemView, WorkspaceLeaf, getAllTags } from 'obsidian'
import { get, set } from 'lodash-es'
import { mount } from 'svelte'
import Main from '$lib/Main.svelte'
import { tagFolderCache } from '$lib/tagFolderCache.svelte'

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
    const container = this.containerEl.children[1] as HTMLElement
    container.style.padding = '0'

    const context: Map<any, any> = new Map()
    context.set('app', this.app)

    mount(Main, {
      target: container,
      context,
    })

    tagFolderCache.rebuild(this.app)

    this.app.workspace.onLayoutReady(() => {
      // TODO: this should be optimized to only update the file provided
      this.app.vault.on('create', _file => tagFolderCache.rebuild(this.app))
      // Yes we need to listen to modify, since new tags could be added/removed and it should react in realtime
      this.app.vault.on('modify', _file => tagFolderCache.rebuild(this.app))
      this.app.vault.on('delete', _file => tagFolderCache.rebuild(this.app))
      this.app.vault.on('rename', _file => tagFolderCache.rebuild(this.app))
    })
  }

  async onClose() {
    // Nothing to clean up.
  }
}
