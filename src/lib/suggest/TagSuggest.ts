import { AbstractInputSuggest } from 'obsidian'
import { tags } from 'src/state/tags.svelte.js'
import { rankSimpleSearch } from '$lib/suggest/rankSimpleSearch'

export class TagSuggest extends AbstractInputSuggest<MaybePseudoTag> {
  protected getSuggestions(query: string): string[] | Promise<string[]> {
    return rankSimpleSearch(
      Array.from(tags.current.keys()).filter(
        (t): t is string => typeof t === 'string',
      ),
      query,
    )
  }

  renderSuggestion(value: string, el: HTMLElement): void {
    el.textContent = value
  }
}
