import TagFoldersPlugin from '../main.svelte.js'
import { App, PluginSettingTab } from 'obsidian'
import { mount, unmount } from 'svelte'
import TfSettingTabContent from './TFSettingTabContent.svelte'

export class TFSettingTab extends PluginSettingTab {
  #instance?: ReturnType<typeof mount>

  constructor(app: App, plugin: TagFoldersPlugin) {
    super(app, plugin)
  }

  display() {
    const { containerEl } = this

    containerEl.empty()

    this.#instance = mount(TfSettingTabContent, {
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
