import {
  AbstractInputSuggest,
  prepareSimpleSearch,
  type SearchResult,
} from 'obsidian'
import { tags } from '$state/tags.svelte'

export class TagSuggest extends AbstractInputSuggest<MaybePseudoTag> {
  protected getSuggestions(query: string): string[] | Promise<string[]> {
    const search = prepareSimpleSearch(query)
    return Array.from(tags.keys())
      .filter((t): t is string => typeof t === 'string')
      .map<[string, SearchResult | null]>(t => [t, search(t)])
      .filter((res): res is [string, SearchResult] => res[1] !== null)
      .toSorted((a, b) => b[1].score - a[1].score)
      .map(([tag]) => tag)
  }

  renderSuggestion(value: string, el: HTMLElement): void {
    el.textContent = value
  }
}
