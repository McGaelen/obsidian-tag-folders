export const SortOrder = {
  filename_asc: 'filename_asc',
  filename_desc: 'filename_desc',
  mtime_desc: 'mtime_desc',
  mtime_asc: 'mtime_asc',
  ctime_desc: 'ctime_desc',
  ctime_asc: 'ctime_asc',
} as const
export type SortOrder = keyof typeof SortOrder
