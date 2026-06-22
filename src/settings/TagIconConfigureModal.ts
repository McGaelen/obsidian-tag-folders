import { type App } from 'obsidian'
import { SvelteModal } from '$lib/obsidian/modal/SvelteModal'
import TagIconConfigureModalContent from './TagIconConfigureModalContent.svelte'

// @ts-expect-error it thinks the svelte component isn't the right type, but this same code works elsewhere with no error lines
export class TagIconConfigureModal extends SvelteModal<TagIconConfigureModalContent> {
  constructor(app: App, tag: MaybePseudoTag) {
    // @ts-expect-error it thinks the svelte component isn't the right type, but this same code works elsewhere with no error lines
    super(app, TagIconConfigureModalContent, {
      app,
      tag,
      onclose: () => this.close(),
    })
    this.setTitle('Configure Tag Icon')
  }
}
