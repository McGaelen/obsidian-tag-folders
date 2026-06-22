import TagFoldersPlugin from '../main.svelte.js'
import { App, PluginSettingTab } from 'obsidian'
import { mount, unmount } from 'svelte'
import TagFoldersSettingsTabSvelte from './TagFoldersSettingsTabSvelte.svelte'

export class TagFolderSettingTab extends PluginSettingTab {
  #instance?: ReturnType<typeof mount>

  constructor(app: App, plugin: TagFoldersPlugin) {
    super(app, plugin)
  }

  display() {
    const { containerEl } = this

    containerEl.empty()

    this.#instance = mount(TagFoldersSettingsTabSvelte, {
      target: containerEl,
      props: { app: this.app },
    })
  }

  hide() {
    if (this.#instance) {
      unmount(this.#instance)
    }
    super.hide()
  }
}
