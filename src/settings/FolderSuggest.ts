import {
  AbstractInputSuggest,
  prepareSimpleSearch,
  type SearchResult,
} from 'obsidian'

export class FolderSuggest extends AbstractInputSuggest<MaybePseudoTag> {
  protected getSuggestions(query: string): string[] | Promise<string[]> {
    const search = prepareSimpleSearch(query)

    return this.app.vault
      .getAllFolders()
      .map<[string, SearchResult | null]>(f => [f.path, search(f.path)])
      .filter((res): res is [string, SearchResult] => res[1] !== null)
      .toSorted((a, b) => b[1].score - a[1].score)
      .map(([path]) => path)
  }

  renderSuggestion(value: string, el: HTMLElement): void {
    el.textContent = value
  }
}
