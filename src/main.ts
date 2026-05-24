import {
  Plugin,
  type WorkspaceLeaf,
} from 'obsidian'
import { VIEW_TYPE_TAG_FOLDERS, TagFoldersView } from '$lib/view'

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
  mySetting: string
}

const DEFAULT_SETTINGS: MyPluginSettings = {
  mySetting: 'default',
}

export default class MyPlugin extends Plugin {
  settings: MyPluginSettings

  async onload() {
    await this.loadSettings()

    this.registerView(VIEW_TYPE_TAG_FOLDERS, leaf => new TagFoldersView(leaf))

    // TODO: this should probably not happen every single time if the user deliberately closed it.
    // TODO: add some kind of state to remember if it's closed or not, then add a command to open it back up from the palette.
    this.app.workspace.onLayoutReady(() => this.#openTagsView())

    // This adds a settings tab so the user can configure various aspects of the plugin
    // this.addSettingTab(new SampleSettingTab(this.app, this));
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_TAG_FOLDERS)
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }

  async #openTagsView() {
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

// class SampleModal extends Modal {
//   constructor(app: App) {
//     super(app)
//   }
//
//   onOpen() {
//     const { contentEl } = this
//     contentEl.setText('Woah!')
//   }
//
//   onClose() {
//     const { contentEl } = this
//     contentEl.empty()
//   }
// }
//
// class SampleSettingTab extends PluginSettingTab {
//   plugin: MyPlugin
//
//   constructor(app: App, plugin: MyPlugin) {
//     super(app, plugin)
//     this.plugin = plugin
//   }
//
//   display(): void {
//     const { containerEl } = this
//
//     containerEl.empty()
//
//     new Setting(containerEl)
//       .setName('Setting #1')
//       .setDesc("It's a secret")
//       .addText(text =>
//         text
//           .setPlaceholder('Enter your secret')
//           .setValue(this.plugin.settings.mySetting)
//           .onChange(async value => {
//             this.plugin.settings.mySetting = value
//             await this.plugin.saveSettings()
//           }),
//       )
//   }
// }
