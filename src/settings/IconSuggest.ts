import {
  AbstractInputSuggest,
  prepareSimpleSearch,
  getIconIds,
  getIcon,
  type SearchResult,
} from 'obsidian'

export class IconSuggest extends AbstractInputSuggest<MaybePseudoTag> {
  protected getSuggestions(query: string): string[] | Promise<string[]> {
    const search = prepareSimpleSearch(query)
    return getIconIds()
      .map<[string, SearchResult | null]>(i => [i, search(i)])
      .filter((res): res is [string, SearchResult] => res[1] !== null)
      .toSorted((a, b) => b[1].score - a[1].score)
      .map(([i]) => i)
  }

  renderSuggestion(value: string, el: HTMLElement): void {
    const icon = getIcon(value)
    el.classList.add('flex', 'items-center', 'gap-2')
    if (icon) {
      el.appendChild(icon)
    }
    el.appendText(value)
  }
}
