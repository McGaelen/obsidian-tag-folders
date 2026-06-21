let selected: string | symbol | null = $state(null)

export const selectedTag = {
  get current() {
    return selected
  },
  set current(newSelectedTag) {
    selected = newSelectedTag
  },
}
