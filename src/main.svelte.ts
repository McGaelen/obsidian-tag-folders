import { Plugin, type WorkspaceLeaf } from 'obsidian'
import './styles.css'
import {
  TFNavView,
  VIEW_TYPE_TAG_FOLDERS,
} from './views/TFNavView/TFNavView'
import { TFSettingTab } from './settings/TFSettingTab'
import { rebuildTags } from '$state/tags.svelte'
import { initSettings } from '$state/settings.svelte'

export default class TagFoldersPlugin extends Plugin {
  #destroyEffect?: () => void

  async onload() {
    const loadedSettings = await this.loadData()

    // Setup a root effect, so we can start using svelte runes right away.
    this.#destroyEffect = $effect.root(() => {
      // Initialize the settings store
      initSettings(loadedSettings, this.saveData.bind(this))

      this.addSettingTab(new TFSettingTab(this.app, this))

      this.registerView(VIEW_TYPE_TAG_FOLDERS, leaf => new TFNavView(leaf))

      this.app.workspace.onLayoutReady(async () => {
        // Initialize the tags store
        this.#initTags()

        // TODO: this should probably not happen every single time if the user deliberately closed it.
        // TODO: add some kind of state to remember if it's closed or not, then add a command to open it back up from the palette.
        await this.#ensureTagsListVisible()
      })
    })
  }

  onunload() {
    this.#destroyEffect?.()
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_TAG_FOLDERS)
  }

  #initTags() {
    rebuildTags(this.app)

    // TODO: these event handlers should be optimized to only update the file provided
    this.app.vault.on('create', _file => {
      // console.log('create', _file)
      rebuildTags(this.app)
    })
    this.app.vault.on('rename', _file => {
      // console.log('rename', _file)
      rebuildTags(this.app)
    })
    // We can't use app.value.on('modify'), because we need to wait for obsidian's cache to refresh,
    // which is how we are able to read tags without manually parsing every file.
    // Therefore, we subscribe to the metadataCache 'changed' event instead.
    this.app.metadataCache.on('changed', (_file, _data, _cache) => {
      // console.log('changed', _file, _data, _cache)
      rebuildTags(this.app)
    })
    this.app.metadataCache.on('deleted', (_file, _prevCache) => {
      // console.log('deleted', _file, _prevCache)
      rebuildTags(this.app)
    })
  }

  async #ensureTagsListVisible() {
    let leaf: WorkspaceLeaf | null
    const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE_TAG_FOLDERS)

    if (!leaves.length) {
      // Our view could not be found in the workspace, create a new leaf inside the left sidebar and show it.
      leaf = this.app.workspace.getLeftLeaf(false)
      if (leaf) {
        await leaf.setViewState({
          type: VIEW_TYPE_TAG_FOLDERS,
          active: true,
        })
        // "Reveal" the leaf in case it is in a collapsed sidebar
        await this.app.workspace.revealLeaf(leaf)
      }
    }
  }
}
