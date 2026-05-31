import initSqlJs, { type Database } from 'sql.js'
import { type App, base64ToArrayBuffer, getAllTags } from 'obsidian'
// Using Vite's ability to inline static assets: https://vite.dev/guide/assets#explicit-inline-handling
// Note that .wasm files need to be added to `assetsInclude` for it to work.
// Yes, you can use '?init' to use wasm files in Vite, but I couldn't get that to work with sql.js.
import wasm from 'sql.js/dist/sql-wasm.wasm?inline'

export let db: Database

// Vite adds the "data:application/wasm;base64," preamble, but obsidian's base64ToArrayBuffer function doesn't like it,
// so trim the beginning of the string up to the comma.
const trimmed = wasm.slice(wasm.indexOf(',') + 1)

const dbInitFinished$ = initSqlJs({
  wasmBinary: base64ToArrayBuffer(trimmed),
})

dbInitFinished$.then(SQL => {
  db = new SQL.Database()

  db.run(`
    create table tags (
      -- 'tag' is potentially a "pseudo tag", since this considers every path segment of a tag
      -- to be a separate tag in itself, even though the tag technically doesn't exist in any notes
      -- (and therefore, Obsidian does not see it.) For example:
      -- 
      -- Given a single file has the tag "#tag1/tag2/tag3", it would create 3 separate rows,
      -- one with 'tag1', one with 'tag1/tag2', and one with 'tag1/tag2/tag3'. 'tag1' and 
      -- 'tag1/tag2' would be _pseudo tags_, since they don't technically exist in any notes.
      -- Only 'tag1/tag2/tag3' would be a real tag which shows up in Obsidian's Tags view.
      --
      -- For a pseudo tag, there should only be 1 row, and 'file_path' will be null.
      tag text,
      file_path text
    );
  `)

  // @ts-expect-error for debugging
  window.db = db
})

export async function seedDb(app: App) {
  await dbInitFinished$
  console.log('seeding db...')

  db.exec(`delete from tags`)

  app.vault.getFiles().forEach(file => {
    const cache = app.metadataCache.getFileCache(file)
    // TODO: getFileCache returns "{}" for canvases. They are in the cache, but it doesn't actually store anything about them.
    // TODO: Obsidian also doesn't show tags inside canvas files in the Tags view, but they _DO_ show up in search results!
    if (!cache) return

    const dedupedTags = Array.from(new Set(getAllTags(cache)))

    // absoluteTag similar to an "absolute path"
    for (const absoluteTag of dedupedTags) {
      const absoluteTagParts = absoluteTag
        .slice(1) // trim the '#' off the front
        .split('/')

      for (let i = 0; i < absoluteTagParts.length; i++) {
        // Each part of the path including all previous parts becomes a discrete tag, as mentioned above.
        // So this tag we're inserting here might not be a "real" tag, hence why it's called "maybePseudoTag"
        const maybePseudoTag = absoluteTagParts.slice(0, i + 1).join('/')
        db.exec(`
          insert into tags (tag, file_path) values ('${maybePseudoTag}', '${file.path}')
        `)
      }
    }
  })
}
