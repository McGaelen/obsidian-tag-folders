/**
 * Represents a tag path which may or may not correspond to a real tag. If it's
 * not a real tag, then it is a partial path of a real tag.
 */
type MaybePseudoTag = string

interface TagIcon {
  iconId?: string
  raw?: string
}

interface TagFoldersSettings {
  exclusions: string[]
  icons: Record<MaybePseudoTag, TagIcon>
}

interface Window {
  app: import('obsidian').App
}

declare const app: import('obsidian').App
