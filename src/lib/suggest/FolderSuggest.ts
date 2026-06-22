import { AbstractInputSuggest } from 'obsidian'
import { rankSimpleSearch } from '$lib/suggest/rankSimpleSearch'

export class FolderSuggest extends AbstractInputSuggest<MaybePseudoTag> {
  protected getSuggestions(query: string): string[] | Promise<string[]> {
    return rankSimpleSearch(
      this.app.vault.getAllFolders().map(f => f.path),
      query,
    )
  }

  renderSuggestion(value: string, el: HTMLElement): void {
    el.textContent = value
  }
}
