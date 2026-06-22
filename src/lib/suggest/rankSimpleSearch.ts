import { prepareSimpleSearch, type SearchResult } from 'obsidian'

export function rankSimpleSearch(items: string[], query: string): string[] {
  const search = prepareSimpleSearch(query)
  return items
    // Perform the search, and drop it into a tuple with the item it was called with.
    // (it'd be great if it recorded the item that was processed in the SearchResult object...
    .map<[string, SearchResult | null]>(i => [i, search(i)])
    // Filter out results that are null, which means they have no match.
    .filter((res): res is [string, SearchResult] => res[1] !== null)
    // Sort by the provided score, descending.
    .toSorted((a, b) => b[1].score - a[1].score)
    // Unpack the item from the tuple so we can get our list of strings back.
    .map(([i]) => i)
}
