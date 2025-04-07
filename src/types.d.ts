interface TagFolder {
  files: string[]
  subTags?: Record<string, TagFolder>
}
