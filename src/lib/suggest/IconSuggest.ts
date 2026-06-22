import { AbstractInputSuggest, getIconIds, getIcon } from 'obsidian'
import { rankSimpleSearch } from '$lib/suggest/rankSimpleSearch'

export class IconSuggest extends AbstractInputSuggest<MaybePseudoTag> {
  protected getSuggestions(query: string): string[] | Promise<string[]> {
    return rankSimpleSearch(getIconIds(), query)
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
