import { type IconName, ItemView, WorkspaceLeaf } from 'obsidian'
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
      // TODO: these event handlers should be optimized to only update the file provided
      this.app.vault.on('create', _file => {
        // console.log('create', _file)
        tagFolderCache.rebuild(this.app)
      })
      this.app.vault.on('rename', _file => {
        // console.log('rename', _file)
        tagFolderCache.rebuild(this.app)
      })
      // We can't use app.value.on('modify'), because we need to wait for obsidian's cache to refresh,
      // which is how we are able to read tags without manually parsing every file.
      // Therefore, we subscribe to the metadataCache 'changed' event instead.
      this.app.metadataCache.on('changed', (_file, _data, _cache) => {
        // console.log('changed', _file, _data, _cache)
        tagFolderCache.rebuild(this.app)
      })
      this.app.metadataCache.on('deleted', (_file, _prevCache) => {
        // console.log('deleted', _file, _prevCache)
        tagFolderCache.rebuild(this.app)
      })
    })
  }

  async onClose() {
    // Nothing to clean up.
  }
}
