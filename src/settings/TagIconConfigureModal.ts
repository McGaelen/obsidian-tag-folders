import { SvelteModal } from '$lib/obsidian/modal/SvelteModal'
import TagIconConfigureModalContent from './TagIconConfigureModalContent.svelte'

// @ts-expect-error it thinks the svelte component isn't the right type, but this same code works elsewhere with no error lines
export class TagIconConfigureModal extends SvelteModal<TagIconConfigureModalContent> {
  constructor(tag: MaybePseudoTag) {
    // @ts-expect-error it thinks the svelte component isn't the right type, but this same code works elsewhere with no error lines
    super(TagIconConfigureModalContent, {
      tag,
      onclose: () => this.close(),
    })
    this.setTitle('Configure Tag Icon')
  }
}
