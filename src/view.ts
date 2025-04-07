import { type IconName, ItemView, WorkspaceLeaf, getAllTags } from 'obsidian'
import { get, set } from 'lodash-es'
import { mount } from 'svelte'
import TagFolders from './TagFolders.svelte'

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
    const container = this.containerEl.children[1]
    container.className = 'nav-files-container'

    const root: TagFolder = {
      files: [],
    }

    this.app.vault.getFiles().forEach(file => {
      const cache = this.app.metadataCache.getFileCache(file)
      if (!cache) return

      const dedupedTags = new Set(getAllTags(cache))

      if (dedupedTags.size !== 0) {
        dedupedTags.forEach(tag => {
          const tagPathAry = tag.slice(1).split('/')

          const rootObjPath = tagPathAry.reduce(
            (acc, tag, i) =>
              `${acc}.${tag}${i === tagPathAry.length - 1 ? '' : '.subTags'}`,
            'subTags',
          )

          // prettier-ignore
          let files = get(root, `${rootObjPath}.files`) as unknown as (string[] | null)
                ?? []

          set(root, `${rootObjPath}.files`, [...files, file.path])
        })
      } else {
        // untagged files
        root.files = [...root.files, file.path]
      }
    })

    mount(TagFolders, {
      target: container,
      props: {
        tagFolder: root,
      },
    })

    console.log(root)
  }

  async onClose() {
    // Nothing to clean up.
  }
}
