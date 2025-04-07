import {
  App,
  Editor,
  MarkdownView,
  Modal,
  Notice,
  Plugin,
  PluginSettingTab,
  Setting,
  type WorkspaceLeaf,
} from 'obsidian'
import { VIEW_TYPE_TAG_FOLDERS, TagFoldersView } from './view'

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

    this.addRibbonIcon('dice', 'Sample Plugin', async (_: MouseEvent) => {
      const { workspace } = this.app

      let leaf: WorkspaceLeaf | null
      const leaves = workspace.getLeavesOfType(VIEW_TYPE_TAG_FOLDERS)

      if (leaves.length > 0) {
        // A leaf with our view already exists, use that
        leaf = leaves[0]
      } else {
        // Our view could not be found in the workspace, create a new leaf
        // in the right sidebar for it
        leaf = workspace.getLeftLeaf(false)
        if (leaf) {
          await leaf.setViewState({
            type: VIEW_TYPE_TAG_FOLDERS,
            active: true,
          })
          // "Reveal" the leaf in case it is in a collapsed sidebar
        }
      }

      await workspace.revealLeaf(leaf)
    })

    // This adds a settings tab so the user can configure various aspects of the plugin
    // this.addSettingTab(new SampleSettingTab(this.app, this));
  }

  onunload() {}

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData())
  }

  async saveSettings() {
    await this.saveData(this.settings)
  }
}

class SampleModal extends Modal {
  constructor(app: App) {
    super(app)
  }

  onOpen() {
    const { contentEl } = this
    contentEl.setText('Woah!')
  }

  onClose() {
    const { contentEl } = this
    contentEl.empty()
  }
}

class SampleSettingTab extends PluginSettingTab {
  plugin: MyPlugin

  constructor(app: App, plugin: MyPlugin) {
    super(app, plugin)
    this.plugin = plugin
  }

  display(): void {
    const { containerEl } = this

    containerEl.empty()

    new Setting(containerEl)
      .setName('Setting #1')
      .setDesc("It's a secret")
      .addText(text =>
        text
          .setPlaceholder('Enter your secret')
          .setValue(this.plugin.settings.mySetting)
          .onChange(async value => {
            this.plugin.settings.mySetting = value
            await this.plugin.saveSettings()
          }),
      )
  }
}
